import { CreditCard } from "./../entities/CreditCard";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
import rawBody from "raw-body";
import { User } from "../entities/User";

const stripeWebhook = (fastify: any, _: void, next: any) => {
  fastify.addContentTypeParser("application/json", (req: any, done: any) => {
    rawBody(
      req,
      {
        length: req.headers["content-length"],
        limit: "1mb",
      },
      (err, body) => {
        if (err) return done(err);
        done(null, body);
      }
    );
  });

  fastify.route({
    url: "/webhook",
    method: "POST",
    handler: async (req: any, reply: any) => {
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          req.headers["stripe-signature"],
          webhookSecret
        );
      } catch (err) {
        console.log(err);
        reply.status(400).send("Improper webhook signature.");
      }
      switch (event.type) {
        case "checkout.session.completed":
          reply.send({ received: true });
          console.log(event);
          await handleCompleteSession(event);
          break;
        case "customer.subscription.deleted":
          reply.send({ recevied: true });
          await handleCustomerSubDeleted(event);
          break;
        case "invoice.payment_succeeded":
          reply.send({ recevied: true });
          await handleInvoicePaid(event);
          break;
        case "customer.subscription.updated":
          reply.send({ received: true });
          await handleSubscriptionUpdated(event);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
          return reply.status(400).end();
      }
      reply.send({ received: true });
    },
  });

  next();
};

// handle functions
const handleSubscriptionUpdated = async (event: any) => {
  const customer = event.data.object.customer;
  const priceId = event.data.object.items.data[0].price.id;
  const user = await User.findOne({ where: { custKey: customer } });
  if (!user) return;
  switch (priceId) {
    case process.env.STRIPE_STUDENT_MONTH_KEY:
      user.wordCount = 500000;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_STUDENT_YEAR_KEY:
      user.wordCount = 6000000;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_RESEARCH_MONTH_KEY:
      user.wordCount = 1000000;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    case process.env.STRIPE_RESEARCH_YEAR_KEY:
      user.wordCount = 12000000;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
  }
  user.current_period = Date.now();
  await user.save();
};
const handleCompleteSession = async (event: any) => {
  const checkoutId = event.data.object.id;
  let uid = event.data.object.client_reference_id;
  if (!uid) return;
  let user = await User.findOne({ where: { id: uid } });
  if (!user) return;

  // assign free-trialed to user, allows them to bypass trials.
  user.freeTrialed = true;

  // retrieve subscription to retrieve payment method
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.subscription
  );

  // retrieve full payment method to have access to fingerprint
  const paymentMethod = await stripe.paymentMethods.retrieve(
    subscription.default_payment_method
  );
  const fingerprint = paymentMethod.card.fingerprint;

  // if card exists in database with that fingerprint, dont distribute product to user.
  const card = await CreditCard.findOne({ where: { fingerprint } });

  // cancel the transaction
  if (card) {
    await user.save();
    stripe.subscriptions.del(event.data.object.subscription);
    return;
  }
  const line_items = await stripe.checkout.sessions.listLineItems(checkoutId);
  const price_id = line_items.data[0].price.id;
  switch (price_id) {
    case process.env.STRIPE_STUDENT_MONTH_KEY:
      user.wordCount = 500000;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_STUDENT_YEAR_KEY:
      user.wordCount = 6000000;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_RESEARCH_MONTH_KEY:
      user.wordCount = 1000000;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    case process.env.STRIPE_RESEARCH_YEAR_KEY:
      user.wordCount = 12000000;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    default:
      console.log("failed");
      break;
  }
  user.custKey = event.data.object.customer;
  user.subKey = event.data.object.subscription;

  // since transaction succeeded, add credit card to the database.
  const newCard = CreditCard.create({ fingerprint: fingerprint });
  await newCard.save();
  await user.save();
};
const handleCustomerSubDeleted = async (event: any) => {
  let custKey = event.data.object.customer;
  let user = await User.findOne({ where: { custKey } });
  if (!user) return;
  user.prem = false;
  user.wordCount = 25000;
  user.paymentTier = "Free";
  user.subKey = "";
  user.custKey = "";
  await user.save();
};
const handleInvoicePaid = async (event: any) => {
  let custKey = event.data.object.customer;
  console.log(event.data.object.payment_settings);
  const billing_reason = event.data.object.billing_reason;
  if (billing_reason === "subscription_create") return;
  let user = await User.findOne({ where: { custKey } });
  if (!user) return;
  const currentWordCount = user.wordCount;
  const price_id = event.data.object.lines.data[0].price.id;
  switch (price_id) {
    case process.env.STRIPE_STUDENT_MONTH_KEY:
      user.wordCount = 500000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_STUDENT_YEAR_KEY:
      user.wordCount = 6000000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_RESEARCH_MONTH_KEY:
      user.wordCount = 1000000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    case process.env.STRIPE_RESEARCH_YEAR_KEY:
      user.wordCount = 12000000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    default:
      console.log("failed");
      break;
  }
  await user.save();
};
module.exports = stripeWebhook;

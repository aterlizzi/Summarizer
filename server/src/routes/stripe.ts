import { CreditCard } from "./../entities/CreditCard";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
import rawBody from "raw-body";
import { User } from "../entities/User";
import { sendPastDueEmail } from "../utils/emails/pastdueEmail";

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
    url: "/api/webhook",
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
          // console.log(event.type);
          await handleCompleteSession(event);
          break;
        case "customer.subscription.deleted":
          reply.send({ recevied: true });
          // console.log(event.type);
          await handleCustomerSubDeleted(event);
          break;
        case "invoice.paid":
          reply.send({ recevied: true });
          await handleInvoicePaid(event);
          break;
        case "customer.subscription.updated":
          reply.send({ received: true });
          // console.log(event.type);
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
  const user = await User.findOne({ where: { custKey: customer } });
  if (!user) return;
  const status = event.data.status;
  switch (status) {
    case "past_due":
      await sendPastDueEmail(user.email);
      break;
    case "canceled":
      user.prem = false;
      user.subKey = "";
      user.custKey = "";
      user.paymentTier = "Free";
      break;
    case "unpaid":
      user.prem = false;
      user.subKey = "";
      user.custKey = "";
      user.paymentTier = "Free";
      break;
    default:
      break;
  }
  user.current_period = Date.now();
  await user.save();
};
const handleCompleteSession = async (event: any) => {
  const checkoutId = event.data.object.id;
  let uid = event.data.object.client_reference_id;
  if (!uid) return;
  const user = await User.findOne({ where: { id: uid } });
  if (!user) return;

  // assign free-trialed to user, allows them to bypass trials.
  user.freeTrialed = true;

  // retrieve subscription to retrieve payment method
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.subscription
  );
  // check to make sure subscription is active
  if (subscription.status !== "active" && subscription.status !== "trialing")
    return;

  // retrieve full payment method to have access to fingerprint
  const paymentMethod = await stripe.paymentMethods.retrieve(
    subscription.default_payment_method
  );
  const fingerprint = paymentMethod.card.fingerprint;

  // if card exists in database with that fingerprint, dont distribute product to user.
  const card = await CreditCard.findOne({ where: { fingerprint } });

  // update user trialing is they are not trialing
  if (user.trialing && subscription.status === "active") {
    user.trialing = false;
  }

  // cancel the transaction if this credit card has been used before for a trial.
  if (card && subscription.status === "trialing") {
    await user.save();
    stripe.subscriptions.del(event.data.object.subscription);
    return;
  }
  const trialing = subscription.status === "trialing";
  const line_items = await stripe.checkout.sessions.listLineItems(checkoutId);
  const price_id = line_items.data[0].price.id;
  const currentCount = user.wordCount;
  switch (price_id) {
    case process.env.STRIPE_STUDENT_MONTH_KEY:
      user.wordCount = trialing ? 250000 : 250000 + currentCount;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_STUDENT_YEAR_KEY:
      user.wordCount = 3000000 + currentCount;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_RESEARCH_MONTH_KEY:
      user.wordCount = trialing ? 750000 : 750000 + currentCount;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    case process.env.STRIPE_RESEARCH_YEAR_KEY:
      user.wordCount = 9000000 + currentCount;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    default:
      console.log("failed");
      break;
  }
  user.current_period = Date.now();
  user.custKey = event.data.object.customer;
  user.subKey = event.data.object.subscription;

  // since transaction succeeded, add credit card to the database.
  if (subscription.status === "trialing") {
    const newCard = CreditCard.create({ fingerprint: fingerprint });
    user.trialing = true;
    await newCard.save();
  }
  await user.save();
};
const handleCustomerSubDeleted = async (event: any) => {
  let custKey = event.data.object.customer;
  const user = await User.findOne({ where: { custKey } });
  if (!user) return;
  const trialing = user.trialing;
  if (trialing) {
    user.wordCount = 25000;
  }
  user.prem = false;
  user.paymentTier = "Free";
  user.subKey = "";
  user.custKey = "";
  await user.save();
};
const handleInvoicePaid = async (event: any) => {
  const custKey = event.data.object.customer;
  const billing_reason = event.data.object.billing_reason;

  // don't handle the first invoice paid, instead that will be handled by session complete.
  if (billing_reason === "subscription_create") return;

  const user = await User.findOne({ where: { custKey } });
  if (!user) return;
  const currentWordCount = user.wordCount;

  console.log("________________________________________");

  // check to see if user just came off a trial.
  const trialing = user.trialing;

  // current subscribed product.
  const price_id = event.data.object.lines.data[0].price.id;
  switch (price_id) {
    case process.env.STRIPE_STUDENT_MONTH_KEY:
      user.wordCount = trialing ? 250000 : 250000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_STUDENT_YEAR_KEY:
      user.wordCount = trialing ? 3000000 : 3000000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Student";
      break;
    case process.env.STRIPE_RESEARCH_MONTH_KEY:
      user.wordCount = trialing ? 750000 : 750000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    case process.env.STRIPE_RESEARCH_YEAR_KEY:
      user.wordCount = trialing ? 9000000 : 9000000 + currentWordCount;
      user.prem = true;
      user.paymentTier = "Researcher";
      break;
    default:
      break;
  }
  user.current_period = Date.now();
  user.trialing = false;
  await user.save();
};
module.exports = stripeWebhook;

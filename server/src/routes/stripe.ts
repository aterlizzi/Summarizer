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
          const checkoutId = event.data.object.id;
          let uid = event.data.object.client_reference_id;
          if (!uid) break;
          let user = await User.findOne({ where: { id: uid } });
          if (!user) break;
          const line_items = await stripe.checkout.sessions.listLineItems(
            checkoutId
          );
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
          await user.save();
          break;
        case "customer.subscription.deleted":
          reply.send({ recevied: true });
          let custKey = event.data.object.customer;
          user = await User.findOne({ where: { custKey } });
          if (!user) break;
          user.prem = false;
          user.wordCount = 25000;
          user.paymentTier = "Free";
          await user.save();
          break;
        case "invoice.paid":
          reply.send({ recevied: true });
          custKey = event.data.object.customer;
          user = await User.findOne({ where: { custKey } });
          if (!user) break;
          if (user.prem) {
            user.wordCount = 500000;
          }
          await user.save();
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

module.exports = stripeWebhook;

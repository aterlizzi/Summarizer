import { MyContext } from "./../../types/MyContext";

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

@Resolver()
export class StripeResolver {
  @Mutation(() => String)
  async createStripeSession(
    @Ctx() ctx: MyContext,
    @Arg("mode") mode: string,
    @Arg("tier") tier: string
  ): Promise<string> {
    const user = await User.findOne({ where: { id: ctx.req.cookies.uid } });
    if (!user) return "";
    let session;
    switch (mode) {
      case "monthly":
        switch (tier) {
          case "researcher":
            session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              client_reference_id: `${user.id}`,
              line_items: [
                {
                  price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                  quantity: 1,
                },
              ],
              mode: "subscription",
              success_url:
                "http://localhost:3000/applications/payments/success?session_id={CHECKOUT_SESSION_ID}",
              cancel_url: "http://localhost:3000/begin",
            });
            return session.url;
          case "student":
            session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              client_reference_id: `${user.id}`,
              line_items: [
                {
                  price: process.env.STRIPE_STUDENT_MONTH_KEY,
                  quantity: 1,
                },
              ],
              mode: "subscription",
              success_url:
                "http://localhost:3000/applications/payments/success?session_id={CHECKOUT_SESSION_ID}",
              cancel_url: "http://localhost:3000/begin",
            });
            return session.url;
          default:
            break;
        }
        break;
      case "yearly":
        switch (tier) {
          case "researcher":
            session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              client_reference_id: `${user.id}`,
              line_items: [
                {
                  price: process.env.STRIPE_RESEARCH_YEAR_KEY,
                  quantity: 1,
                },
              ],
              mode: "subscription",
              success_url:
                "http://localhost:3000/applications/payments/success?session_id={CHECKOUT_SESSION_ID}",
              cancel_url: "http://localhost:3000/begin",
            });
            return session.url;
          case "student":
            session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              client_reference_id: `${user.id}`,
              line_items: [
                {
                  price: process.env.STRIPE_STUDENT_YEAR_KEY,
                  quantity: 1,
                },
              ],
              mode: "subscription",
              success_url:
                "http://localhost:3000/applications/payments/success?session_id={CHECKOUT_SESSION_ID}",
              cancel_url: "http://localhost:3000/begin",
            });
            return session.url;
          default:
            break;
        }
        break;
      default:
        break;
    }
    return "";
  }
}

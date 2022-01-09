import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "./../../types/MyContext";

import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

@Resolver()
export class StripeResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createStripeSession(
    @Ctx() { payload }: MyContext,
    @Arg("mode") mode: string,
    @Arg("tier") tier: string
  ): Promise<string> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return "/welcome?target_url=%2Fbegin";

    // determines whether to launch free trial through stripe or not.
    const freeTrial = !user.freeTrialed;
    let session;
    switch (mode) {
      case "monthly":
        switch (tier) {
          case "researcher":
            freeTrial
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  subscription_data: {
                    trial_period_days: 7,
                  },
                  line_items: [
                    {
                      price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                      quantity: 1,
                    },
                  ],
                  mode: "subscription",
                  metadata: {
                    trial: true,
                  },
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }))
              : (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                      quantity: 1,
                    },
                  ],
                  mode: "subscription",
                  metadata: {
                    trial: true,
                  },
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }));
            return session.url;
          case "student":
            freeTrial
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  subscription_data: {
                    trial_period_days: 7,
                  },
                  line_items: [
                    {
                      price: process.env.STRIPE_STUDENT_MONTH_KEY,
                      quantity: 1,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  mode: "subscription",
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }))
              : (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_STUDENT_MONTH_KEY,
                      quantity: 1,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  mode: "subscription",
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }));
            return session.url;
          default:
            break;
        }
        break;
      case "yearly":
        switch (tier) {
          case "researcher":
            freeTrial
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  subscription_data: {
                    trial_period_days: 7,
                  },
                  line_items: [
                    {
                      price: process.env.STRIPE_RESEARCH_YEAR_KEY,
                      quantity: 1,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  mode: "subscription",
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }))
              : (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_RESEARCH_YEAR_KEY,
                      quantity: 1,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  mode: "subscription",
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }));
            return session.url;
          case "student":
            freeTrial
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  subscription_data: {
                    trial_period_days: 7,
                  },
                  line_items: [
                    {
                      price: process.env.STRIPE_STUDENT_YEAR_KEY,
                      quantity: 1,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  mode: "subscription",
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }))
              : (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_STUDENT_YEAR_KEY,
                      quantity: 1,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  mode: "subscription",
                  success_url:
                    "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url: "http://localhost:3000/begin",
                }));
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

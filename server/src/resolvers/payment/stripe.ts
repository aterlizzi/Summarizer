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
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user) return "/welcome?target_url=%2Fbegin";

    // if the user is referred, create a coupon to give them the percent off.
    let coupon;
    if (user.settings.referralDiscount !== 0) {
      coupon = await stripe.coupons.create({
        duration: "once",
        percent_off: user.settings.referralDiscount,
        name: "Referral Discount",
      });
    }
    // determines whether to launch free trial through stripe or not.
    const freeTrial = !user.freeTrialed;
    let session;
    switch (mode) {
      case "monthly":
        switch (tier) {
          case "researcher":
            freeTrial
              ? coupon && coupon.id
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
                    discounts: [
                      {
                        coupon: coupon.id,
                      },
                    ],
                    metadata: {
                      trial: true,
                    },
                    success_url:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                        : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                    cancel_url:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/begin"
                        : "https://www.untanglify.com/begin",
                  }))
                : (session = await stripe.checkout.sessions.create({
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
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                        : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                    cancel_url:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/begin"
                        : "https://www.untanglify.com/begin",
                  }))
              : coupon && coupon.id
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                      quantity: 1,
                    },
                  ],
                  mode: "subscription",
                  discounts: [
                    {
                      coupon: coupon.id,
                    },
                  ],
                  metadata: {
                    trial: true,
                  },
                  success_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
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
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
                }));
            return session.url;
          case "student":
            freeTrial
              ? coupon && coupon.id
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
                    discounts: [
                      {
                        coupon: coupon.id,
                      },
                    ],
                    success_url:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                        : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                    cancel_url:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/begin"
                        : "https://www.untanglify.com/begin",
                  }))
                : (session = await stripe.checkout.sessions.create({
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
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                        : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                    cancel_url:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/begin"
                        : "https://www.untanglify.com/begin",
                  }))
              : coupon && coupon.id
              ? (session = await stripe.checkout.sessions.create({
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
                  discounts: [
                    {
                      coupon: coupon.id,
                    },
                  ],
                  success_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
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
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
                }));
            return session.url;
          default:
            break;
        }
        break;
      case "yearly":
        switch (tier) {
          case "researcher":
            coupon && coupon.id
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_RESEARCH_YEAR_KEY,
                      quantity: 1,
                    },
                  ],
                  mode: "subscription",
                  discounts: [
                    {
                      coupon: coupon.id,
                    },
                  ],
                  success_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
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
                  mode: "subscription",
                  success_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
                }));
            return session.url;
          case "student":
            coupon && coupon.id
              ? (session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  client_reference_id: `${user.id}`,
                  line_items: [
                    {
                      price: process.env.STRIPE_STUDENT_YEAR_KEY,
                      quantity: 1,
                    },
                  ],
                  mode: "subscription",
                  discounts: [
                    {
                      coupon: coupon.id,
                    },
                  ],
                  success_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
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
                  mode: "subscription",
                  success_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}"
                      : "https://www.untanglify.com/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                  cancel_url:
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/begin"
                      : "https://www.untanglify.com/begin",
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

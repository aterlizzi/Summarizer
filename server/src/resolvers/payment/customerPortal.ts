import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "./../../types/MyContext";

import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

@Resolver()
export class CustomerPortalResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createCustomerPortal(@Ctx() { payload }: MyContext): Promise<string> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return "";
    const session = await stripe.billingPortal.sessions.create({
      customer: user.custKey,
      return_url: "http://localhost:3000/users/settings?personal=true",
    });
    return session.url;
  }
}

import { MyContext } from "./../../types/MyContext";

import { Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class StripeResolver {
  @Mutation(() => User, { nullable: true })
  async createStripeSession(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const user = await User.findOne({ where: { id: ctx.req.cookies.uid } });
    if (!user) return undefined;
    return user;
  }
}

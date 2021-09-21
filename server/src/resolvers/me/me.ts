import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const user = await User.findOne({ where: { id: ctx.req.session.userId } });
    if (!user) return undefined;
    return user;
  }
}

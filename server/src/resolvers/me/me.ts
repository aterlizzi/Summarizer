import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() ctx: MyContext,
    @Arg("email", { nullable: true }) email: string,
    @Arg("sub", { nullable: true }) sub: string
  ): Promise<User | undefined> {
    if (email) {
      const user = await User.findOne({ where: { email } });
      if (!user) return undefined;
      return user;
    } else if (sub) {
      const user = await User.findOne({ where: { googleSubKey: sub } });
      if (!user) return undefined;
      return user;
    } else {
      const user = await User.findOne({
        where: { id: ctx.req.session.userId },
      });
      if (!user) return undefined;
      return user;
    }
  }
}

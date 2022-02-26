import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entities/User";
import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MakeAdminResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async makeAdmin(@Ctx() { payload }: MyContext): Promise<boolean> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return false;
    user.admin = true;
    await user.save();
    return true;
  }
}

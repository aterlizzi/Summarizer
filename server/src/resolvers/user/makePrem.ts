import { isAdmin } from "./../../middlewares/isAdmin";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MakePremiumResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async makePremium(
    @Ctx() { payload }: MyContext,
    @Arg("username") username: string
  ): Promise<boolean> {
    const admin = await User.findOne({ where: { id: payload!.userId } });
    const user = await User.findOne({ where: { username } });
    if (!admin || !user) return false;
    if (!admin.admin) return false;
    user.wordCount = 250000;
    user.prem = true;
    user.paymentTier = "Student";
    user.current_period = Date.now();
    await user.save();
    return true;
  }
}

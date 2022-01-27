import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entities/User";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: [
        "settings",
        "settings.emailSettings",
        "settings.extensionSettings",
        "bundles",
      ],
    });
    if (!user) return undefined;
    await handleCooldown(user.id);
    return user;
  }
}

const handleCooldown = async (userId: number) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return;
  const current_date = new Date();
  current_date.setMonth(current_date.getMonth() - 1);
  if (current_date.getTime() >= user.current_period) {
    user.current_period = Date.now();
    user.wordCount += 25000;
    user.prem = false;
    user.paymentTier = "Free";
    await user.save();
  }
};

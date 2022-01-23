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
      ],
    });
    if (!user) return undefined;
    return user;
  }
}

const handleCooldown = async (userId: number) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return;
  const current_date = new Date();
  current_date.setMonth(current_date.getMonth() - 1);
  if (current_date.getTime() >= user.current_period) {
    const tier = user.paymentTier;
    switch (tier) {
      case "Free":
        user.wordCount += 15000;
        break;
      case "Student":
        user.wordCount += 150000;
        break;
      case "Researcher":
        user.wordCount += 500000;
        break;
      default:
        break;
    }
    user.current_period = Date.now();
    await user.save();
  }
};

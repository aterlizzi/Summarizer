import { RecentSummaries } from "./../../entities/RecentSummaries";
import { ExtensionSettings } from "./../../entities/ExtensionSettings";
import { EmailSettings } from "./../../entities/EmailSettings";
import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/isAuth";
import { Settings } from "../../entities/Settings";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

@Resolver()
export class DeleteResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Ctx() { payload, reply }: MyContext,
    @Arg("email", { nullable: true }) email: string
  ): Promise<boolean> {
    let user;
    if (email) {
      user = await User.findOne({
        where: { email },
        relations: [
          "settings",
          "settings.emailSettings",
          "recentSummaries",

          // "settings.extensionSettings",
        ],
      });
    } else {
      user = await User.findOne({
        where: { id: payload!.userId },
        relations: [
          "settings",
          "settings.emailSettings",
          "recentSummaries",
          // "settings.extensionSettings",
        ],
      });
    }
    if (!user || user.admin) return false;
    if (user.subKey !== "" && user.prem) {
      try {
        await stripe.subscriptions.del(user.subKey);
      } catch {
        return false;
      }
    }
    const settingsId = user.settings.id;
    const emailSettingsId = user.settings.emailSettings.id;
    // const extensionSettingsId = user.settings.extensionSettings.id;
    await EmailSettings.delete(emailSettingsId);
    // await ExtensionSettings.delete(extensionSettingsId);
    await Settings.delete(settingsId);
    try {
      await User.delete(user.id);
    } catch (err) {
      console.log(err);
    }
    reply.clearCookie("jid", { path: "/" });
    return true;
  }
}

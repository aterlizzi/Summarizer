import { UpdateExtensionSettingsInput } from "./../../types/updateExtensionSettings";
import { User } from "./../../entities/User";
import { UpdateEmailSettingsInput } from "./../../types/updateEmailSettingsInput";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class UpdateSettingsResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateEmailSettings(
    @Ctx() { payload }: MyContext,
    @Arg("options")
    { news, surveys, business, features }: UpdateEmailSettingsInput
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings", "settings.emailSettings"],
    });
    if (!user) return false;
    user.settings.emailSettings.monthlyNews = news;
    user.settings.emailSettings.improvementSurveys = surveys;
    user.settings.emailSettings.businessEmails = business;
    user.settings.emailSettings.featureReleases = features;
    await user.save();
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateExtensionSettings(
    @Ctx() { payload }: MyContext,
    @Arg("options")
    { popout, onlyFriendsCanView }: UpdateExtensionSettingsInput
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings", "settings.extensionSettings"],
    });
    if (!user) return false;
    user.settings.extensionSettings.onlyFriendsCanView = onlyFriendsCanView;
    user.settings.extensionSettings.popoutSummary = popout;
    console.log(popout);
    await user.save();
    return true;
  }
}

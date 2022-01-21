import { ExtensionSettings } from "./../../entities/ExtensionSettings";
import { User } from "../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class ChangeUserAdminResolver {
  @Mutation(() => User, { nullable: true })
  async addWords(
    @Arg("id") id: number,
    @Arg("wordCount") wordCount: number
  ): Promise<User | undefined> {
    const user = await User.findOne(id);
    if (!user) return undefined;
    user.wordCount = wordCount;
    return await user.save();
  }
  @Mutation(() => User, { nullable: true })
  async addExtensionSettings(@Arg("id") id: number): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id },
      relations: ["settings", "settings.extensionSettings"],
    });
    if (!user) return undefined;
    const settings = user.settings;
    const extensionSettings = ExtensionSettings.create({ settings });
    user.settings.extensionSettings = extensionSettings;
    return await user.save();
  }
}

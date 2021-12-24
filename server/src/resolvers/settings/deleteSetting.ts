import { Settings } from "./../../entities/Settings";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class FindSettingsResolver {
  @Mutation(() => Boolean)
  async deleteSettings(@Arg("id") id: number): Promise<boolean> {
    const settings = await Settings.findOne({ where: { id } });
    if (!settings) return false;
    await Settings.delete(settings.id);
    return true;
  }
}

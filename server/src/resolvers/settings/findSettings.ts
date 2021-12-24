import { Settings } from "./../../entities/Settings";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class FindSettingsResolver {
  @Query(() => [Settings])
  async findSettings(): Promise<Settings[]> {
    const settings = await Settings.find();
    return settings;
  }
}

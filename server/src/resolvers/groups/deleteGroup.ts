import { Groups } from "./../../entities/Groups";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class DeleteGroupResolver {
  @Mutation(() => Boolean)
  async deleteGroup(@Arg("id") id: number): Promise<boolean> {
    try {
      const group = await Groups.findOne(id);
      if (!group) return false;
      group.admins = [];
      group.users = [];
      group.summaries = [];
      group.pinnedSummaries = [];
      await group.save();
      await Groups.delete(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

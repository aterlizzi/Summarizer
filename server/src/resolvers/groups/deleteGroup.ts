import { Groups } from "./../../entities/Groups";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class DeleteGroupResolver {
  @Mutation(() => Boolean)
  async deleteGroup(@Arg("id") id: number): Promise<boolean> {
    try {
      await Groups.delete(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

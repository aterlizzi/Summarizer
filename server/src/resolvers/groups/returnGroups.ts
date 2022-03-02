import { Groups } from "./../../entities/Groups";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class ReturnGroupResolver {
  @Query(() => [Groups])
  async returnGroups(): Promise<Groups[]> {
    const groups = await Groups.find({ relations: ["admins"] });
    return groups;
  }
}

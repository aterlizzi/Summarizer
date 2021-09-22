import { User } from "./../../entities/User";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class FindUsersResolver {
  @Query(() => [User])
  async findUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
  }
}

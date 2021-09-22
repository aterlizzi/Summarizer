import { User } from "./../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class DeleteResolver {
  @Mutation(() => Boolean)
  async deleteUser(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    await User.delete(user.id);
    return true;
  }
}

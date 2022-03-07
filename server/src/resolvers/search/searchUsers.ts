import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { Like } from "typeorm";

@Resolver()
export class SearchUserResolver {
  @Mutation(() => [User])
  @UseMiddleware(isAuth)
  async searchUsers(
    @Arg("username") username: string,
    @Ctx() { payload }: MyContext
  ): Promise<User[]> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user || username === "") return [];

    // find users with like username
    const tempUsers = await User.find({
      where: { username: Like(`%${username}%`) },
    });

    // filter out users own username
    const users = tempUsers.filter((tempUser) => {
      if (user.id === tempUser.id) return false;
      return true;
    });
    return [...users];
  }
}

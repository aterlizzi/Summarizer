import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { Groups } from "../../entities/Groups";

@Resolver()
export class CreateGroupResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addToGroup(
    @Ctx() { payload }: MyContext,
    @Arg("usernames", () => [String]) usernames: string[],
    @Arg("groupId") groupId: number
  ): Promise<boolean> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    const group = await Groups.findOne({ where: { id: groupId } });
    if (!user || !group) return false;
    try {
      const functionThatReturnsPromise = (username: string) => {
        return User.findOne({ where: { username } });
      };
      const doSomethingAsync = async (username: string) => {
        return functionThatReturnsPromise(username);
      };
      const getUsers = async (usernames: string[]) => {
        return Promise.all(
          usernames.map((username) => doSomethingAsync(username))
        );
      };
      const data = await getUsers(usernames);
      console.log(data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

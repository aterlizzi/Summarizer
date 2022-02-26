import { CreateGroupInput } from "./../../types/group/createGroupInput";
import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class CreateGroupResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createGroup(
    @Ctx() { payload }: MyContext,
    @Arg("options") options: CreateGroupInput
  ): Promise<boolean> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return false;
    return true;
  }
}

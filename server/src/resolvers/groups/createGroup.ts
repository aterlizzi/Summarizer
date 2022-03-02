import { CreateGroupInput } from "./../../types/group/createGroupInput";
import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { Groups } from "../../entities/Groups";

@Resolver()
export class CreateGroupResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createGroup(
    @Ctx() { payload }: MyContext,
    @Arg("options")
    { name, description, inviteOnly, publicPosts }: CreateGroupInput
  ): Promise<boolean> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return false;
    const group = Groups.create({
      name,
      description,
      inviteOnly,
      publicPosts,
      admins: [user],
    });
    await group.save();
    return true;
  }
}

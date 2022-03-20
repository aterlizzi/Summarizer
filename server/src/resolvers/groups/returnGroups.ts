import { checkIfLogged } from "./../../middlewares/checkIfLogged";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Groups } from "./../../entities/Groups";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class ReturnGroupResolver {
  @Query(() => [Groups])
  async returnGroups(): Promise<Groups[]> {
    const groups = await Groups.find({ relations: ["admins"] });
    return groups;
  }
  @Query(() => [Groups])
  @UseMiddleware(isAuth)
  async returnUserGroups(@Ctx() { payload }: MyContext): Promise<Groups[]> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: [
        "groups",
        "adminGroups",
        "groups.users",
        "adminGroups.users",
        "groups.admins",
        "adminGroups.admins",
      ],
    });
    if (!user) return [];
    const arr = [...user.adminGroups, ...user.groups];
    return arr;
  }
  @Query(() => Groups, { nullable: true })
  @UseMiddleware(checkIfLogged)
  async returnGroup(
    @Arg("id") id: string,
    @Ctx() { payload }: MyContext
  ): Promise<Groups | undefined> {
    const group = await Groups.findOne({
      where: { groupId: id },
      relations: ["admins", "users"],
    });

    if (!group) return undefined;
    if (!group.publicPosts) {
      // if user isn't logged in, return undefined
      if (!payload) return undefined;
      // if user is not part of the group return undefined
      if (
        group.users.filter((user) => user.id === parseInt(payload.userId))
          .length === 0 &&
        group.admins.filter((user) => user.id === parseInt(payload.userId))
          .length === 0
      )
        return undefined;
    }
    return group;
  }
}

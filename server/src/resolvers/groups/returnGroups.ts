import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Groups } from "./../../entities/Groups";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
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
}

import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/isAuth";
import { Settings } from "../../entities/Settings";

@Resolver()
export class DeleteResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Ctx() { payload, reply }: MyContext,
    @Arg("email", { nullable: true }) email: string
  ): Promise<boolean> {
    let user;
    if (email) {
      user = await User.findOne({ where: { email }, relations: ["settings"] });
    } else {
      user = await User.findOne({
        where: { id: payload!.userId },
        relations: ["settings"],
      });
    }
    if (!user || user.admin) return false;
    const settingsId = user.settings.id;
    await Settings.delete(settingsId);
    await User.delete(user.id);
    reply.clearCookie("jid", { path: "/" });
    return true;
  }
}

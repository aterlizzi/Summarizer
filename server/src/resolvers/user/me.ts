import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entities/User";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings", "settings.emailSettings"],
    });
    if (!user) return undefined;
    return user;
  }
}

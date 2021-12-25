import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/isAuth";

@Resolver()
export class ChangeNameResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async changeName(
    @Ctx() { payload }: MyContext,
    @Arg("name", { nullable: true }) name: string
  ): Promise<boolean> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return false;
    user.username = name;
    await user.save();
    return true;
  }
}

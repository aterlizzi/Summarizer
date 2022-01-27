import { Bundle } from "../../entities/Bundle";
import { MyContext } from "./../../types/MyContext";
import { CreateBundleInput } from "./../../types/bundle/createBundleInput";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class CreateBundleResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createBundle(
    @Arg("options") options: CreateBundleInput,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["bundles"],
    });
    if (!user) return false;
    const newBundle = Bundle.create({
      user,
      title: options.title,
      description: options.description ? options.description : "",
    });
    const bundles = user.bundles;
    bundles.push(newBundle);
    user.bundles = bundles;
    await user.save();
    return true;
  }
}

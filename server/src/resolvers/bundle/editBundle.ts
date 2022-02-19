import { EditBundleInput } from "./../../types/bundle/editBundleInput";
import { MyContext } from "./../../types/MyContext";
import { RecentSummaries } from "./../../entities/RecentSummaries";
import { Bundle } from "../../entities/Bundle";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class EditBundleResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addToBundle(
    @Arg("bundleId") bundleId: number,
    @Arg("summaryId") summaryId: number
  ): Promise<boolean> {
    const summary = await RecentSummaries.findOne({ where: { id: summaryId } });
    const bundle = await Bundle.findOne({
      where: { id: bundleId },
      relations: ["summaries"],
    });
    if (!bundle || !summary) return false;
    bundle.summaries.push(summary);
    await bundle.save();
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async editBundle(
    @Arg("bundleId") bundleId: number,
    @Ctx() { payload }: MyContext,
    @Arg("options") options: EditBundleInput
  ): Promise<boolean> {
    const bundle = await Bundle.findOne({
      where: { id: bundleId },
      relations: ["user"],
    });
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!bundle || !user) return false;
    if (bundle.user.id !== user.id) return false;
    if (options.description !== "") {
      bundle.description = options.description as string;
    }
    if (options.title !== "") {
      bundle.title = options.title as string;
    }
    await bundle.save();
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBundle(@Arg("bundleId") bundleId: number): Promise<boolean> {
    try {
      await Bundle.delete(bundleId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

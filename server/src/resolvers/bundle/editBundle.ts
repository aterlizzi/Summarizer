import { RecentSummaries } from "./../../entities/RecentSummaries";
import { Bundle } from "../../entities/Bundle";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

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
}

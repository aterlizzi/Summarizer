import { Bundle } from "../../entities/Bundle";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
const _ = require("lodash");
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class ReturnBundleResolver {
  @Query(() => [Bundle])
  @UseMiddleware(isAuth)
  async returnBundles(
    @Arg("sort", { nullable: true }) sort: string,
    @Ctx() { payload }: MyContext
  ): Promise<Bundle[]> {
    let sortedBundles;
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: [
        "bundles",
        "bundles.summaries",
        "settings",
        "settings.extensionSettings",
      ],
    });
    if (!user) return [];
    if (!sort) {
      sort = user.settings.extensionSettings.lastBundleSortType;
    }
    const bundles = user.bundles;

    switch (sort) {
      case "createdAt_desc":
        sortedBundles = _.orderBy(bundles, "createdAt", "desc");
        break;
      case "createdAt_asc":
        sortedBundles = _.orderBy(bundles, "createdAt", "asc");
        break;
      case "updatedAt_desc":
        sortedBundles = _.orderBy(bundles, "updatedAt", "desc");
        break;
      case "updatedAt_asc":
        sortedBundles = _.orderBy(bundles, "updatedAt", "asc");
        break;
      case "alphabetical_desc":
        sortedBundles = _.orderBy(bundles, "title", "desc");
        break;
      case "alphabetical_asc":
        sortedBundles = _.orderBy(bundles, "title", "asc");
        break;
      default:
        sortedBundles = _.orderBy(bundles, "createdAt", "desc");
        break;
    }
    // createdAt
    // --------------
    // desc = newest bundle first
    // asc = oldest bundle first
    // alphabetical
    // ----------------
    // desc = Z-A;
    // asc = A-Z;
    // updatedAt
    // -----------------
    // desc = newest change first
    // asc = oldest change first
    user.settings.extensionSettings.lastBundleSortType = sort;
    await user.save();
    return sortedBundles;
  }
  @Query(() => Bundle, { nullable: true })
  @UseMiddleware(isAuth)
  async returnBundle(@Arg("id") id: number): Promise<Bundle | undefined> {
    const bundle = Bundle.findOne({ where: { id }, relations: ["summaries"] });
    if (!bundle) return undefined;
    return bundle;
  }
}

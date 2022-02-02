import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "./../../types/MyContext";
import { RecentSummaries } from "./../../entities/RecentSummaries";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class ReturnSummariesResolver {
  @Query(() => [RecentSummaries], { nullable: true })
  async returnSummaries(): Promise<RecentSummaries[]> {
    const summaries = await RecentSummaries.find();
    return summaries;
  }
  @Query(() => [RecentSummaries])
  @UseMiddleware(isAuth)
  async returnUserSummaries(
    @Ctx() { payload }: MyContext
  ): Promise<RecentSummaries[]> {
    const user = await User.findOne({
      where: { id: payload!.userId },
    });
    if (!user) return [];
    const recentSummaries = RecentSummaries.find({
      relations: ["user"],
      where: { user },
      take: 5,
      order: { id: "DESC" },
    });
    return recentSummaries;
  }
  @Mutation(() => RecentSummaries, { nullable: true })
  @UseMiddleware(isAuth)
  async returnSummary(
    @Ctx() { payload }: MyContext,
    @Arg("id") id: number
  ): Promise<RecentSummaries | undefined> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return;
    const recentSummary = await RecentSummaries.findOne({
      where: { id },
      relations: ["user", "user.settings", "user.settings.extensionSettings"],
    });
    if (!recentSummary) return;

    // if the user doesn't allow users to view their summaries and the user viewing isnt the owner of the summary, return the user.
    if (
      recentSummary.user.settings.extensionSettings.onlyFriendsCanView &&
      user.id !== recentSummary.user.id
    )
      return;
    return recentSummary;
  }
}

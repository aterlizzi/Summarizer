import { isAuth } from "./../../middlewares/isAuth";
import { RecentSummaries } from "./../../entities/RecentSummaries";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class EditSummariesResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async editSummary(
    @Arg("id") id: number,
    @Arg("rating") rating: number
  ): Promise<boolean> {
    const summary = await RecentSummaries.findOne({ where: { id } });
    if (!summary) return false;
    if (summary.rating) {
      const currentRating = summary.rating;
      summary.rating =
        (currentRating * summary.numberOfRatings + rating) /
        (summary.numberOfRatings + 1);
      summary.numberOfRatings += 1;
    } else {
      summary.rating = rating;
      summary.numberOfRatings += 1;
    }
    await summary.save();
    return true;
  }
}

import { SaveSummaryInputObj } from "./../../types/SaveSummaryInputObj";
import { Arg, Mutation, Resolver } from "type-graphql";
import { SavedSummary } from "./../../entities/SavedSummary";
import { User } from "./../../entities/User";

@Resolver()
export class SaveSummaryResolver {
  @Mutation(() => SavedSummary, { nullable: true })
  async saveSummary(
    @Arg("options") { email, sub, summary, url }: SaveSummaryInputObj
  ): Promise<SavedSummary | undefined> {
    let user;
    if (email) {
      user = await User.findOne({ where: { email }, relations: ["summaries"] });
    } else if (sub) {
      user = await User.findOne({
        where: { googleSubKey: sub },
        relations: ["summaries"],
      });
    }
    if (!user) return undefined;
    const newSummarySave = SavedSummary.create({
      author: user,
      url,
      summary,
    });
    user.summaries = [...user.summaries, newSummarySave];
    await user.save();
    return newSummarySave;
  }
}

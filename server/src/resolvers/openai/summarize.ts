import { RecentSummaries } from "./../../entities/RecentSummaries";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { SummaryInputObj } from "./../../types/SummaryInputObj";
import { SummaryReturnObj } from "./../../types/SummaryReturnObj";
import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import {
  countWords,
  handleCooldown,
  handlePromiseChain,
  handleSaveRecentSummary,
  spliceLargeText,
} from "./utils";
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

@Resolver()
export class SummarizeResolver {
  @Mutation(() => SummaryReturnObj, { nullable: true })
  @UseMiddleware(isAuth)
  async summarize(
    @Arg("options")
    { text, url, title, privateSummary, actionType }: SummaryInputObj,
    @Ctx() { payload }: MyContext
  ): Promise<SummaryReturnObj | undefined> {
    // if these are not assigned for some reason, assign them.
    if (!actionType) {
      actionType = "entire";
    }
    let privated = privateSummary;

    // handle privatization
    if (privated === undefined || privated === null) {
      privated = false;
    }

    // get accurate word count
    const wordCount = countWords(text);
    console.log(text, wordCount);

    // payload is not undefined because of authentication process.
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["recentSummaries", "settings", "settings.extensionSettings"],
    });

    if (!user) return undefined;

    // check for cooldown on user
    if (!user.prem) await handleCooldown(user);

    // prevent user from summarizing if wordlimit is exceeded.
    if (user.wordCount < wordCount) return undefined;

    // if action type is entire, look for the existence of that summary, otherwise summarize again.
    let testSum;
    if (actionType === "entire") {
      testSum = await RecentSummaries.findOne({
        where: { title, url },
      });
    }
    if (testSum) {
      return {
        summary: testSum.summary,
        remainingSummaries: user.wordCount,
        url,
        id: testSum.id,
        popout: user.settings.extensionSettings.popoutSummary,
      };
    }

    // initiate split for texts greater than 1200
    if (wordCount > 1200) {
      // construct an appropriately sized textarr to make digesting the text easier.
      const textArr = spliceLargeText(text, wordCount);

      // parses the textarr into a promise chain that is resolved.
      const summary = await handlePromiseChain(textArr);

      // refactor when saving to database
      const saveSummary = summary.split("NEWSECTION").join(" ");

      // subtract the word count.
      user.wordCount = user.wordCount - wordCount;

      user.totalWordsSummarized += wordCount;

      await user.save();

      // save the summary in the database
      const sumId = await handleSaveRecentSummary(
        user.id,
        url,
        saveSummary,
        title,
        privated,
        actionType
      );
      return {
        summary,
        remainingSummaries: user.wordCount,
        url,
        id: sumId,
        popout: user.settings.extensionSettings.popoutSummary,
      };
    } else {
      let summary;
      // const response = await openai.complete({
      //   engine: "babbage-instruct-beta",
      //   prompt: `Summarize the important details in following text.\n\nText: ${text.trim()} \n\nSummary:`,
      //   temperature: 0,
      //   max_tokens: 160,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });
      const response = await openai.complete({
        engine: "babbage-instruct-beta",
        prompt: `List the key takeaways of the following article.\n\nText: ${text.trim()} \n\nKey Takeaways:`,
        temperature: 0,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      // const response = await openai.complete({
      //   engine: "babbage-instruct-beta",
      //   prompt: `Summarize the following text.\n\nText: ${text.trim()} \n\nSummary:`,
      //   temperature: 0,
      //   max_tokens: 160,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });
      const uneditedSummary = response.data.choices[0].text;
      const sentences = uneditedSummary
        .replace(/\n/gm, " ")
        .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/gm)
        .filter((sentence: string) => {
          if (!sentence.match(/\.$/gm)) return false;
          return true;
        });
      summary = sentences
        .join(" ")
        .trim()
        .replace(/[0-9]\.$/gm, "");
      const regex = /^[1]|^-/g;
      if (uneditedSummary.trim().match(regex)) {
        summary = "The key takeaways of the text are as follows: " + summary;
      } else {
        summary = summary;
      }
      user.wordCount = user.wordCount - wordCount;
      user.totalWordsSummarized += wordCount;
      await user.save();
      const sumId = await handleSaveRecentSummary(
        user.id,
        url,
        summary,
        title,
        privated,
        actionType
      );
      return {
        summary,
        remainingSummaries: user.wordCount,
        url,
        id: sumId,
        popout: user.settings.extensionSettings.popoutSummary,
      };
    }
  }
}

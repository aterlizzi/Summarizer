import { Summary } from "./../../entities/Summary";
import { SummaryInputObj } from "./../../types/SummaryInputObj";
import { SummaryReturnObj } from "./../../types/SummaryReturnObj";
import { User } from "../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

@Resolver()
export class SummarizeResolver {
  @Mutation(() => SummaryReturnObj, { nullable: true })
  async summarize(
    @Arg("options") { email, sub, text, wordCount, url }: SummaryInputObj
  ): Promise<SummaryReturnObj | undefined> {
    let user;
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (sub) {
      user = await User.findOne({ where: { googleSubKey: sub } });
    }
    if (!user || user.remainingSummaries <= 0) return undefined;
    const gtpResponse = await openai.complete({
      engine: "davinci-instruct-beta",
      prompt: `Summarize the text:\nText: ${text}\nSummary:`,
      maxTokens: 250,
      temperature: 0.9,
      topP: 1,
    });
    if (user.remainingSummaries - wordCount <= 0) {
      user.remainingSummaries = 0;
    } else {
      user.remainingSummaries = user.remainingSummaries - wordCount;
    }
    const newSummary = Summary.create({
      email: user.email,
      url,
      summary: gtpResponse.choices[0].text as string,
      baseText: text,
    });
    await newSummary.save();
    await user.save();
    const returnObj = {
      summary: gtpResponse.choices[0].text as string,
      remainingSummaries: user.remainingSummaries,
    };
    return returnObj;
  }
}

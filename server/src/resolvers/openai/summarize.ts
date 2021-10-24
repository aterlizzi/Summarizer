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
    @Arg("options") { email, sub, text, url }: SummaryInputObj
  ): Promise<SummaryReturnObj | undefined> {
    let wordCount = text.split(" ").length;
    let user;
    console.log(email, sub, text, url);
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (sub) {
      user = await User.findOne({ where: { googleSubKey: sub } });
    }
    if (!user || user.wordCount <= 0) return undefined;
    const request = async (text: string) => {
      // const gtpResponse = await openai.complete({
      //   engine: "ada",
      //   prompt: `I think therefore I`,
      //   maxTokens: 2,
      //   temperature: 0.9,
      //   topP: 1,
      // });
      // const gtpResponse = await openai.complete({
      //   engine: "curie",
      //   prompt: `My student asked me what the main point of this passage was:\n"""\n${text}\n"""\nI rephrased it for him, in plain language a college student can understand:\n"""`,
      //   maxTokens: 150,
      //   temperature: 0.3,
      //   topP: 1,
      //   presencePenalty: 0,
      //   frequencyPenalty: 1,
      //   stop: [`"""`],
      // });
      // const gtpResponse = await openai.complete({
      //   engine: "curie",
      //   prompt: `${text}\nI rephrased this for my student, in plain language a twelfth grader can understand:`,
      //   maxTokens: 100,
      //   temperature: 0,
      //   topP: 1,
      //   presencePenalty: 0,
      //   frequencyPenalty: 1,
      // });
      // const gtpResponse = await openai.complete({
      //   engine: "curie",
      //   prompt: `${text}\ntl;dr:`,
      //   maxTokens: 100,
      //   temperature: 0,
      //   topP: 1,
      //   presencePenalty: 0,
      //   frequencyPenalty: 1,
      // });
      const gtpResponse = await openai.complete({
        engine: "curie-instruct-beta",
        prompt: `Give a brief statement of the main points of the following text.\nText: ${text}\nStatement:`,
        maxTokens: 150,
        temperature: 0,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
      });
      // const gtpResponse = await openai.complete({
      //   engine: "curie-instruct-beta",
      //   prompt: `Write a unique summary of the following text:\n${text}\nSummary:`,
      //   maxTokens: 125,
      //   temperature: 0,
      //   topP: 1,
      //   presencePenalty: 0,
      //   frequencyPenalty: 0,
      // });
      return gtpResponse;
    };
    const rawResult = await request(text);
    let summary = await parseResponseData(rawResult, text);
    if (summary === "") {
      summary = "I'm sorry, we were unable to summarize this text.";
    }
    console.log(rawResult.data.choices[0].text, "___________________", summary);
    if (summary !== "I'm sorry, we were unable to summarize this text.") {
      if (user.wordCount - wordCount <= 0) {
        user.wordCount = 0;
      } else {
        user.wordCount = user.wordCount - wordCount;
      }
    }
    const newSummary = Summary.create({
      email: user.email,
      url,
      summary: rawResult.data.choices[0].text as string,
      baseText: text,
    });
    await newSummary.save();
    await user.save();
    const returnObj = {
      summary: summary as string,
      remainingSummaries: user.wordCount,
      url,
    };
    return returnObj;
  }
}

const parseResponseData = async (rawResult: any, text: string) => {
  // cut out unfinished sentences.
  let summary = rawResult.data.choices[0].text
    .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/)
    .filter((sentence: string) => {
      if (!sentence.match(/\.$/gm)) return false;
      return true;
    })
    .join(" ")
    .replace(/^\s/g, "")
    .replace(/\n.*/gm, "");
  const originalTextSentenceArr = text.split(
    /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
  );
  const summaryTextSentenceArr = summary.split(
    /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
  );
  const newSummaryTextSentenceArr = summaryTextSentenceArr.filter(
    (sentence: string) => {
      if (originalTextSentenceArr.indexOf(sentence) == -1) return true;
      return false;
    }
  );
  const originalLength = summaryTextSentenceArr.length;
  const newLength = newSummaryTextSentenceArr.length;
  if (newLength / originalLength < 0.333) {
    const gtpResponse = await openai.complete({
      engine: "curie-instruct-beta",
      prompt: `Give a brief statement of the main points of the following text.\nText: ${text}\nStatement:`,
      maxTokens: 150,
      temperature: 0,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
    });
    summary = gtpResponse.data.choices[0].text
      .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/)
      .filter((sentence: string) => {
        if (!sentence.match(/\.$/gm)) return false;
        return true;
      })
      .join(" ")
      .replace(/^\s/g, "")
      .replace(/\n.*/gm, "");

    const secondSummarySentenceArr = summary.split(
      /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
    );
    const secondNewSummaryTextSentenceArr = secondSummarySentenceArr.filter(
      (sentence: string) => {
        if (originalTextSentenceArr.indexOf(sentence) !== -1) return true;
        return false;
      }
    );
    const secondNewLength = secondNewSummaryTextSentenceArr.length;
    if (secondNewLength / originalLength < 0.8) {
      summary = "I'm sorry, we were unable to summarize this text.";
    }
  }
  return summary;
};

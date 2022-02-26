import { RecentSummaries } from "./../../entities/RecentSummaries";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { SummaryInputObj } from "./../../types/SummaryInputObj";
import { SummaryReturnObj } from "./../../types/SummaryReturnObj";
import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

@Resolver()
export class SummarizeResolver {
  @Mutation(() => SummaryReturnObj, { nullable: true })
  @UseMiddleware(isAuth)
  async summarize(
    @Arg("options") { text, url, title, privateSummary }: SummaryInputObj,
    @Ctx() { payload }: MyContext
  ): Promise<SummaryReturnObj | undefined> {
    const wordCount = countWords(text);
    console.log(text, wordCount);

    // payload is not undefined because of authentication process.
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["recentSummaries", "settings", "settings.extensionSettings"],
    });

    if (!user) return undefined;
    if (!user.prem) await handleCooldown(user);
    if (user.wordCount < wordCount) return undefined;
    const testSum = await RecentSummaries.findOne({ where: { title, url } });
    if (testSum) {
      return {
        summary: testSum.summary,
        remainingSummaries: user.wordCount,
        url,
        id: testSum.id,
        popout: user.settings.extensionSettings.popoutSummary,
      };
    }
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
      const sumId = await handleSaveRecentSummary(
        user.id,
        url,
        saveSummary,
        title,
        privateSummary
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
        privateSummary
      );
      try {
        console.log(user.settings.extensionSettings.popoutSummary);
      } catch (err) {
        console.log(err);
      }
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
const handleCooldown = async (user: User) => {
  const current_date = new Date();
  current_date.setMonth(current_date.getMonth() - 1);
  if (current_date.getTime() >= user.current_period) {
    user.wordCount = 25000;
    user.current_period = Date.now();
  }
  await user.save();
};
const spliceLargeText: any = (text: string, wordCount: number) => {
  let [largestFactor, newWordCount] = determineLargestFactor(wordCount);
  // if word count is "some what" prime, return the function again to find a better factor.
  if (largestFactor < 400) {
    return spliceLargeText(text, wordCount + 10);
  }
  console.log(largestFactor);
  const hashmap = sectionalizeText(largestFactor, newWordCount, text);
  console.log(hashmap);
  return hashmap;
};
const sectionalizeText = (
  largestFactor: number,
  newWordCount: number,
  text: string
) => {
  const newWord = text.split(" ");
  const smallerFac = Math.floor(newWordCount / largestFactor); // wont always return a whole number due to strange rounding, therefore floor is necessary.
  let hash: summaryHash = {}; // preallocation of hash map to store relevant words used in word search.
  let increment = largestFactor;
  // minus one because the last section doesn't need to be split.
  for (let i = 0; i < smallerFac - 1; i++) {
    hash[i] = [
      newWord[increment - 2],
      newWord[increment - 1],
      newWord[increment],
      newWord[increment + 1],
      newWord[increment + 2],
    ];
    increment += largestFactor;
  }

  // parse the hash for any symbols that throw off the regex.
  console.log(hash);
  hash = handleParseHash(hash);

  let editableText = text.trim();
  const finalPassageArr = [];
  for (let j = 0; j < smallerFac - 1; j++) {
    let dynamicRegex = new RegExp(
      `.* ${hash[j][0]} ${hash[j][1]} ${hash[j][2]} ${hash[j][3]} ${hash[j][4]} .*?(?=\\?|\\.|\\!)(\\.|\\?|\\!)`,
      "gm"
    );
    const passageArr = editableText.match(dynamicRegex);
    finalPassageArr[j] = passageArr![0];
    editableText = editableText.replace(dynamicRegex, "").trim();
  }
  finalPassageArr[smallerFac - 1] = editableText;
  return finalPassageArr;
};
const determineFactors = (n: number) => {
  if (n < 0) return;
  let sqrtn = Math.sqrt(n);
  const factors = [];
  for (let i = 1; i <= sqrtn; i++) {
    if (i !== 0 && n % i == 0) {
      factors.push(i);
    }
  }
  let j = factors.length - 1;
  if (factors[j] * factors[j] == n) {
    j -= 1;
  }
  while (j >= 0) {
    factors.push(n / factors[j]);
    j -= 1;
  }
  return factors;
};
const determineLargestFactor = (wordCount: number) => {
  let factors: number[] | undefined = [];
  let largestFactor = 0;
  let newWordCount = wordCount;
  while (factors.length < 3) {
    factors = determineFactors(newWordCount);
    console.log(factors);
    if (!factors) return [];
    newWordCount += 1;
  }
  const newFactors = factors.filter((factor) => {
    if (factor > 1200) return false;
    return true;
  });
  largestFactor = Math.max(...newFactors);
  return [largestFactor, newWordCount];
};
const countWords = (text: string): number => {
  // remove any excess characters that are not A-Z or a-z
  const removeChar = text.replace(/[^A-Za-z]\s+/g, " ");

  // remove white space in front of and behind the string. Then split into an array.
  const newWord = removeChar.trim().split(" ");

  // return the array length to get the word count.
  return newWord.length;
};

// need to parse hash for any symbols that might mess up the regex.
const handleParseHash = (hash: summaryHash) => {
  for (let i in hash) {
    for (let key in hash[i]) {
      let indexOf = hash[i][key].indexOf("(");
      if (indexOf !== -1) {
        const arr = hash[i][key].split("");
        // add \ to the word to avoid regex mishaps.
        arr.splice(indexOf, 0, "\\");
        hash[i][key] = arr.join("");
      }
      indexOf = hash[i][key].indexOf(")");
      if (indexOf !== -1) {
        const arr = hash[i][key].split("");
        // add \ to the word to avoid regex mishaps.
        arr.splice(indexOf, 0, "\\");
        hash[i][key] = arr.join("");
      }
      indexOf = hash[i][key].indexOf("[");
      if (indexOf !== -1) {
        const arr = hash[i][key].split("");
        // add \ to the word to avoid regex mishaps.
        arr.splice(indexOf, 0, "\\");
        hash[i][key] = arr.join("");
      }
      indexOf = hash[i][key].indexOf("]");
      if (indexOf !== -1) {
        const arr = hash[i][key].split("");
        // add \ to the word to avoid regex mishaps.
        arr.splice(indexOf, 0, "\\");
        hash[i][key] = arr.join("");
      }
    }
  }
  return hash;
};

// used for large word counts.
const handlePromiseChain = async (textArr: string[]) => {
  const promiseArr = new Array(textArr.length);
  for (let i in textArr) {
    promiseArr[i] = new Promise(async (resolve, reject) => {
      const response = await openai.complete({
        engine: "babbage-instruct-beta",
        prompt: `List the key takeaways of the following article.\n\nText: ${textArr[i]} \n\nSummary:`,
        temperature: 0,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      // const response = await openai.complete({
      //   engine: "babbage-instruct-beta",
      //   prompt: `Summarize the important details of the following text.\n\nText: ${textArr[i]} \n\nSummary:`,
      //   temperature: 0,
      //   max_tokens: 160,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });
      // const response = await openai.complete({
      //   engine: "babbage-instruct-beta",
      //   prompt: `In a paragraph, summarize the following text.\n\nText: ${textArr[i]} \n\nSummary:`,
      //   temperature: 0,
      //   max_tokens: 160,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });
      if (response.data.choices[0].text) {
        resolve(response.data.choices[0].text);
      } else {
        reject("reject");
      }
    });
  }
  const uneditedSummaries = await Promise.all([...promiseArr]);
  const editedSummaries = uneditedSummaries
    .map((summary) => {
      const sentences = summary.split(
        /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/gm
      );
      const newSentences = sentences.filter((sentence: string) => {
        if (!sentence.match(/\.$/gm)) return false;
        return true;
      });
      const newSummary = newSentences.join(" ");
      return newSummary.trim().replace(/[0-9]\.$/gm, "");
    })
    .map((summary, idx) => {
      const regex = /^[1]|^-/g;
      if (summary.trim().match(regex)) {
        if (idx === 0) {
          return "The key takeaways of this text are as follows: " + summary;
        } else {
          return "Additional takeaways include: " + summary;
        }
      }
      return summary;
    });
  return editedSummaries.join("NEWSECTION");
};

// used for handling recent summary saving
const handleSaveRecentSummary = async (
  userId: number,
  url: string | undefined,
  summary: string,
  title: string,
  privateSummary: boolean
) => {
  const user = await User.findOne({
    where: { id: userId },
    relations: ["recentSummaries"],
  });
  if (!user) return;
  const summaries = user.recentSummaries;
  const newSummary = RecentSummaries.create({
    url,
    summary,
    title,
    private: privateSummary,
  });
  switch (user.paymentTier) {
    case "Free":
      if (summaries.length >= 5) {
        const deletedSummary = summaries.shift();
        await RecentSummaries.delete(deletedSummary!.id);
        summaries.push(newSummary);
        user.recentSummaries = [...summaries];
      } else if (summaries.length > 0) {
        summaries.push(newSummary);
        user.recentSummaries = [...summaries];
      } else {
        user.recentSummaries = [newSummary];
      }
      break;
    case "Student":
      if (summaries.length >= 50) {
        const deletedSummary = summaries.shift();
        await RecentSummaries.delete(deletedSummary!.id);
        summaries.push(newSummary);
        user.recentSummaries = [...summaries];
      } else if (summaries.length > 0) {
        summaries.push(newSummary);
        user.recentSummaries = [...summaries];
      } else {
        user.recentSummaries = [newSummary];
      }
      break;
    case "Researcher":
      if (summaries.length > 0) {
        summaries.push(newSummary);
        user.recentSummaries = [...summaries];
      } else {
        user.recentSummaries = [newSummary];
      }
      break;
    default:
      break;
  }
  await user.save();
  console.log("------------------_--------------\n", newSummary.id);
  return newSummary.id;
};

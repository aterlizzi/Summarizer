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
    @Arg("options") { text, url, title }: SummaryInputObj,
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
    if (wordCount > 1200) {
      // construct an appropriately sized textarr to make digesting the text easier.
      const textArr = spliceLargeText(text, wordCount);
      // parses the textarr into a promise chain that is resolved.
      const summary = await handlePromiseChain(textArr);
      // subtract the word count.
      user.wordCount = user.wordCount - wordCount;
      await user.save();
      const sumId = await handleSaveRecentSummary(user.id, url, summary, title);
      console.log({
        summary,
        remainingSummaries: user.wordCount,
        url,
        id: sumId,
        popout: user.settings.extensionSettings.popoutSummary,
      });
      return {
        summary,
        remainingSummaries: user.wordCount,
        url,
        id: sumId,
        popout: user.settings.extensionSettings.popoutSummary,
      };
    } else {
      const response = await openai.complete({
        engine: "babbage-instruct-beta",
        prompt: `Summarize the following text.\n\nText: ${text.trim()} \n\nSummary:`,
        temperature: 0,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const summary = response.data.choices[0].text;
      user.wordCount = user.wordCount - wordCount;
      await user.save();
      const sumId = await handleSaveRecentSummary(user.id, url, summary, title);
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
// const parseResponseData = async (rawResult: any, text: string) => {
//   // cut out unfinished sentences.
//   let summary = rawResult.data.choices[0].text
//     .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/)
//     .filter((sentence: string) => {
//       if (!sentence.match(/\.$/gm)) return false;
//       return true;
//     })
//     .join(" ")
//     .replace(/^\s/g, "")
//     .replace(/\n.*/gm, "");
//   const originalTextSentenceArr = text.split(
//     /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
//   );
//   const summaryTextSentenceArr = summary.split(
//     /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
//   );
//   const newSummaryTextSentenceArr = summaryTextSentenceArr.filter(
//     (sentence: string) => {
//       if (originalTextSentenceArr.indexOf(sentence) == -1) return true;
//       return false;
//     }
//   );
//   const originalLength = summaryTextSentenceArr.length;
//   const newLength = newSummaryTextSentenceArr.length;
//   if (newLength / originalLength < 0.333) {
//     console.log("flagged");
//     const gtpResponse = await openai.complete({
//       engine: "curie-instruct-beta",
//       prompt: `Write a brief statement of the main points of the following text.\nText: ${text}\nStatement:`,
//       maxTokens: 150,
//       temperature: 0,
//       topP: 1,
//       presencePenalty: 0,
//       frequencyPenalty: 0,
//     });
//     summary = gtpResponse.data.choices[0].text
//       .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/)
//       .filter((sentence: string) => {
//         if (!sentence.match(/\.$/gm)) return false;
//         return true;
//       })
//       .join(" ")
//       .replace(/^\s/g, "")
//       .replace(/\n.*/gm, "");

//     const secondSummarySentenceArr = summary.split(
//       /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
//     );
//     const secondNewSummaryTextSentenceArr = secondSummarySentenceArr.filter(
//       (sentence: string) => {
//         if (originalTextSentenceArr.indexOf(sentence) !== -1) return true;
//         return false;
//       }
//     );
//     const secondNewLength = secondNewSummaryTextSentenceArr.length;
//     if (secondNewLength / originalLength < 0.8) {
//       summary = "I'm sorry, we were unable to summarize this text.";
//     }
//   }
//   return summary;
// };
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
        prompt: `In a paragraph, summarize the following text.\n\nText: ${textArr[i]} \n\nSummary:`,
        temperature: 0,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (response.data.choices[0].text) {
        resolve(response.data.choices[0].text);
      } else {
        reject("reject");
      }
    });
  }
  const summaries = await Promise.all([...promiseArr]);
  return summaries.join(" ");
};

// used for handling recent summary saving
const handleSaveRecentSummary = async (
  userId: number,
  url: string | undefined,
  summary: string,
  title: string
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

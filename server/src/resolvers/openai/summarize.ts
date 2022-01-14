import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Summary } from "./../../entities/Summary";
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
    @Arg("options") { email, sub, text, url }: SummaryInputObj,
    @Ctx() { payload }: MyContext
  ): Promise<SummaryReturnObj | undefined> {
    const wordCount = countWords(text);
    console.log(text, wordCount);

    // payload is not undefined because of authentication process.
    const user = await User.findOne({ where: { id: payload!.userId } });

    if (!user) return undefined;
    if (!user.prem) await handleCooldown(user);
    if (user.wordCount <= 0) return undefined;
    if (wordCount > 1200) {
      spliceLargeText(text, wordCount);
    }
    return undefined;

    // const request = async (text: string) => {
    // const gtpResponse = await openai.complete({
    //   engine: "ada",
    //   prompt: `I think therefore I`,
    //   maxTokens: 2,
    //   temperature: 0.9,
    //   topP: 1,
    // });
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
const spliceLargeText = (text: string, wordCount: number) => {
  const [largestFactor, newWordCount] = determineLargestFactor(wordCount);
  console.log(largestFactor);
  const hashmap = sectionalizeText(largestFactor, newWordCount, text);
  console.log(hashmap);
};
const sectionalizeText = (
  largestFactor: number,
  newWordCount: number,
  text: string
) => {
  // const removeChar = text.replace(/[^A-Za-z]\s+/g, " ");
  // const newWord = removeChar.trim().split(" ");
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
    console.log("flagged");
    const gtpResponse = await openai.complete({
      engine: "curie-instruct-beta",
      prompt: `Write a brief statement of the main points of the following text.\nText: ${text}\nStatement:`,
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
  let newWordCount = wordCount;
  while (factors.length < 3) {
    factors = determineFactors(newWordCount);
    if (!factors) return [];
    newWordCount += 1;
  }
  const newFactors = factors.filter((factor) => {
    if (factor > 1200) return false;
    return true;
  });
  const largestInt = Math.max(...newFactors);
  return [largestInt, newWordCount];
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

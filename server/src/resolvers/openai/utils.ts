import { Onboarding } from "../../entities/Onboarding";
import { RecentSummaries } from "../../entities/RecentSummaries";
import { User } from "../../entities/User";
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// used for handling recent summary saving
export const handleSaveRecentSummary = async (
  userId: number,
  url: string | undefined,
  summary: string,
  title: string,
  privated: boolean,
  actionType: string
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
    private: privated,
    type: actionType,
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

// cooldown
export const handleCooldown = async (user: User) => {
  const current_date = new Date();
  current_date.setMonth(current_date.getMonth() - 1);
  if (current_date.getTime() >= user.current_period) {
    user.wordCount = 25000;
    user.current_period = Date.now();
  }
  await user.save();
};

// counts the words in a text.
export const countWords = (text: string): number => {
  // remove any excess characters that are not A-Z or a-z
  const removeChar = text.replace(/[^A-Za-z]\s+/g, " ");

  // remove white space in front of and behind the string. Then split into an array.
  const newWord = removeChar.trim().split(" ");

  // return the array length to get the word count.
  return newWord.length;
};

// used for large word counts.
export const handlePromiseChain = async (textArr: string[]) => {
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

// handle summary text functions

export const spliceLargeText: any = (text: string, wordCount: number) => {
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

// given a number, return its largest factor under 1200
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

// active onboarding page changes.
export const handleOnboardingPage = async (
  actionType: string | undefined,
  user: User,
  url: string,
  text: string,
  privateSummary: boolean | undefined
) => {
  // if the entire page is being summarized, update that.
  if (actionType === "entire") {
    if (user.onboarding) {
      user.onboarding.summarizedEntirePage = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    } else {
      const onboarding = Onboarding.create({
        user,
      });
      user.onboarding = onboarding;
      user.onboarding.summarizedEntirePage = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    }
    return {
      summary: `Congradulations! You've successfully summarized this page! Normally this would display the summary.`,
      url,
      popout: false,
      remainingSummaries: user.wordCount,
    };
  } else if (
    actionType === "highlighted" &&
    text ===
      'Summarize text you highlight on a webpage by simply clicking and dragging the cursor over words. Then click "summarize highlighted" on the extension and click the summarize button. Try it on this paragraph!'
  ) {
    if (user.onboarding) {
      user.onboarding.summarizedHighlightedSectionPage = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    } else {
      const onboarding = Onboarding.create({
        user,
      });
      user.onboarding = onboarding;
      user.onboarding.summarizedHighlightedSectionPage = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    }
    return {
      summary: `Congradulations! You've successfully summarized a highlighted section! Normally this would display the summary.`,
      url,
      popout: false,
      remainingSummaries: user.wordCount,
    };
  } else if (actionType === "file") {
    if (user.onboarding) {
      user.onboarding.summarizedFile = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    } else {
      const onboarding = Onboarding.create({
        user,
      });
      user.onboarding = onboarding;
      user.onboarding.summarizedFile = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    }
    return {
      summary: `Well done! Normally this would display the summary for the pdf you submitted, but not this time!`,
      url,
      popout: false,
      remainingSummaries: user.wordCount,
    };
  } else if (actionType === "manual") {
    if (user.onboarding) {
      user.onboarding.summarizedManual = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    } else {
      const onboarding = Onboarding.create({
        user,
      });
      user.onboarding = onboarding;
      user.onboarding.summarizedManual = true;
      if (privateSummary) {
        user.onboarding.summarizedPrivately = true;
      }
      await user.save();
    }
    return {
      summary: `Success! You would have a summary of your manually inputted text.`,
      url,
      popout: false,
      remainingSummaries: user.wordCount,
    };
  } else {
    return {
      summary: `Whoops, I think you were trying to complete the onboarding process but something might have been messed up.`,
      url,
      popout: false,
      remainingSummaries: user.wordCount,
    };
  }
};

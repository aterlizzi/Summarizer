"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOnboardingPage = exports.spliceLargeText = exports.handlePromiseChain = exports.countWords = exports.handleCooldown = exports.handleSaveRecentSummary = void 0;
const Onboarding_1 = require("../../entities/Onboarding");
const RecentSummaries_1 = require("../../entities/RecentSummaries");
const User_1 = require("../../entities/User");
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const handleSaveRecentSummary = (userId, url, summary, title, privated, actionType) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: { id: userId },
        relations: ["recentSummaries"],
    });
    if (!user)
        return;
    const summaries = user.recentSummaries;
    const newSummary = RecentSummaries_1.RecentSummaries.create({
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
                yield RecentSummaries_1.RecentSummaries.delete(deletedSummary.id);
                summaries.push(newSummary);
                user.recentSummaries = [...summaries];
            }
            else if (summaries.length > 0) {
                summaries.push(newSummary);
                user.recentSummaries = [...summaries];
            }
            else {
                user.recentSummaries = [newSummary];
            }
            break;
        case "Student":
            if (summaries.length >= 50) {
                const deletedSummary = summaries.shift();
                yield RecentSummaries_1.RecentSummaries.delete(deletedSummary.id);
                summaries.push(newSummary);
                user.recentSummaries = [...summaries];
            }
            else if (summaries.length > 0) {
                summaries.push(newSummary);
                user.recentSummaries = [...summaries];
            }
            else {
                user.recentSummaries = [newSummary];
            }
            break;
        case "Researcher":
            if (summaries.length > 0) {
                summaries.push(newSummary);
                user.recentSummaries = [...summaries];
            }
            else {
                user.recentSummaries = [newSummary];
            }
            break;
        default:
            break;
    }
    yield user.save();
    console.log("------------------_--------------\n", newSummary.id);
    return newSummary.id;
});
exports.handleSaveRecentSummary = handleSaveRecentSummary;
const handleCooldown = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const current_date = new Date();
    current_date.setMonth(current_date.getMonth() - 1);
    if (current_date.getTime() >= user.current_period) {
        user.wordCount = 25000;
        user.current_period = Date.now();
    }
    yield user.save();
});
exports.handleCooldown = handleCooldown;
const countWords = (text) => {
    const removeChar = text.replace(/[^A-Za-z]\s+/g, " ");
    const newWord = removeChar.trim().split(" ");
    return newWord.length;
};
exports.countWords = countWords;
const handlePromiseChain = (textArr) => __awaiter(void 0, void 0, void 0, function* () {
    const promiseArr = new Array(textArr.length);
    for (let i in textArr) {
        promiseArr[i] = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield openai.complete({
                engine: "babbage-instruct-beta",
                prompt: `List the key takeaways of the following article.\n\nText: ${textArr[i]} \n\nSummary:`,
                temperature: 0,
                max_tokens: 160,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            if (response.data.choices[0].text) {
                resolve(response.data.choices[0].text);
            }
            else {
                reject("reject");
            }
        }));
    }
    const uneditedSummaries = yield Promise.all([...promiseArr]);
    const editedSummaries = uneditedSummaries
        .map((summary) => {
        const sentences = summary.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/gm);
        const newSentences = sentences.filter((sentence) => {
            if (!sentence.match(/\.$/gm))
                return false;
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
            }
            else {
                return "Additional takeaways include: " + summary;
            }
        }
        return summary;
    });
    return editedSummaries.join("NEWSECTION");
});
exports.handlePromiseChain = handlePromiseChain;
const spliceLargeText = (text, wordCount) => {
    let [largestFactor, newWordCount] = determineLargestFactor(wordCount);
    if (largestFactor < 400) {
        return (0, exports.spliceLargeText)(text, wordCount + 10);
    }
    console.log(largestFactor);
    const hashmap = sectionalizeText(largestFactor, newWordCount, text);
    console.log(hashmap);
    return hashmap;
};
exports.spliceLargeText = spliceLargeText;
const determineLargestFactor = (wordCount) => {
    let factors = [];
    let largestFactor = 0;
    let newWordCount = wordCount;
    while (factors.length < 3) {
        factors = determineFactors(newWordCount);
        console.log(factors);
        if (!factors)
            return [];
        newWordCount += 1;
    }
    const newFactors = factors.filter((factor) => {
        if (factor > 1200)
            return false;
        return true;
    });
    largestFactor = Math.max(...newFactors);
    return [largestFactor, newWordCount];
};
const determineFactors = (n) => {
    if (n < 0)
        return;
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
const sectionalizeText = (largestFactor, newWordCount, text) => {
    const newWord = text.split(" ");
    const smallerFac = Math.floor(newWordCount / largestFactor);
    let hash = {};
    let increment = largestFactor;
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
    console.log(hash);
    hash = handleParseHash(hash);
    let editableText = text.trim();
    const finalPassageArr = [];
    for (let j = 0; j < smallerFac - 1; j++) {
        let dynamicRegex = new RegExp(`.* ${hash[j][0]} ${hash[j][1]} ${hash[j][2]} ${hash[j][3]} ${hash[j][4]} .*?(?=\\?|\\.|\\!)(\\.|\\?|\\!)`, "gm");
        const passageArr = editableText.match(dynamicRegex);
        finalPassageArr[j] = passageArr[0];
        editableText = editableText.replace(dynamicRegex, "").trim();
    }
    finalPassageArr[smallerFac - 1] = editableText;
    return finalPassageArr;
};
const handleParseHash = (hash) => {
    for (let i in hash) {
        for (let key in hash[i]) {
            let indexOf = hash[i][key].indexOf("(");
            if (indexOf !== -1) {
                const arr = hash[i][key].split("");
                arr.splice(indexOf, 0, "\\");
                hash[i][key] = arr.join("");
            }
            indexOf = hash[i][key].indexOf(")");
            if (indexOf !== -1) {
                const arr = hash[i][key].split("");
                arr.splice(indexOf, 0, "\\");
                hash[i][key] = arr.join("");
            }
            indexOf = hash[i][key].indexOf("[");
            if (indexOf !== -1) {
                const arr = hash[i][key].split("");
                arr.splice(indexOf, 0, "\\");
                hash[i][key] = arr.join("");
            }
            indexOf = hash[i][key].indexOf("]");
            if (indexOf !== -1) {
                const arr = hash[i][key].split("");
                arr.splice(indexOf, 0, "\\");
                hash[i][key] = arr.join("");
            }
        }
    }
    return hash;
};
const handleOnboardingPage = (actionType, user, url, text, privateSummary) => __awaiter(void 0, void 0, void 0, function* () {
    if (actionType === "entire") {
        if (user.onboarding) {
            user.onboarding.summarizedEntirePage = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        else {
            const onboarding = Onboarding_1.Onboarding.create();
            user.onboarding = onboarding;
            user.onboarding.summarizedEntirePage = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        return {
            summary: `Congradulations! You've successfully summarized this page! Normally this would display the summary.`,
            url,
            popout: false,
            remainingSummaries: user.wordCount,
        };
    }
    else if (actionType === "highlighted" &&
        text ===
            "Please highlight this text and then click summarize (after selecting highlighted) to complete this part!") {
        if (user.onboarding) {
            user.onboarding.summarizedHighlightedSectionPage = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        else {
            const onboarding = Onboarding_1.Onboarding.create();
            user.onboarding = onboarding;
            user.onboarding.summarizedHighlightedSectionPage = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        return {
            summary: `Congradulations! You've successfully summarized a highlighted section! Normally this would display the summary.`,
            url,
            popout: false,
            remainingSummaries: user.wordCount,
        };
    }
    else if (actionType === "file") {
        if (user.onboarding) {
            user.onboarding.summarizedFile = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        else {
            const onboarding = Onboarding_1.Onboarding.create();
            user.onboarding = onboarding;
            user.onboarding.summarizedFile = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        return {
            summary: `Well done! Normally this would display the summary for the pdf you submitted, but not this time!`,
            url,
            popout: false,
            remainingSummaries: user.wordCount,
        };
    }
    else if (actionType === "manual") {
        if (user.onboarding) {
            user.onboarding.summarizedManual = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        else {
            const onboarding = Onboarding_1.Onboarding.create();
            user.onboarding = onboarding;
            user.onboarding.summarizedManual = true;
            if (privateSummary) {
                user.onboarding.summarizedPrivately = true;
            }
            yield user.save();
        }
        return {
            summary: `Success! You would have a summary of your manually inputted text.`,
            url,
            popout: false,
            remainingSummaries: user.wordCount,
        };
    }
    else {
        return {
            summary: `Whoops, I think you were trying to complete the onboarding process but something might have been messed up.`,
            url,
            popout: false,
            remainingSummaries: user.wordCount,
        };
    }
});
exports.handleOnboardingPage = handleOnboardingPage;
//# sourceMappingURL=utils.js.map
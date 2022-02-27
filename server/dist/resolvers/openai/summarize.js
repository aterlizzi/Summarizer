"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.SummarizeResolver = void 0;
const RecentSummaries_1 = require("./../../entities/RecentSummaries");
const isAuth_1 = require("./../../middlewares/isAuth");
const SummaryInputObj_1 = require("./../../types/SummaryInputObj");
const SummaryReturnObj_1 = require("./../../types/SummaryReturnObj");
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
let SummarizeResolver = class SummarizeResolver {
    summarize({ text, url, title, privateSummary }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            privateSummary = false;
            const wordCount = countWords(text);
            console.log(text, wordCount);
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["recentSummaries", "settings", "settings.extensionSettings"],
            });
            if (!user)
                return undefined;
            if (!user.prem)
                yield handleCooldown(user);
            if (user.wordCount < wordCount)
                return undefined;
            const testSum = yield RecentSummaries_1.RecentSummaries.findOne({ where: { title, url } });
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
                const textArr = spliceLargeText(text, wordCount);
                const summary = yield handlePromiseChain(textArr);
                const saveSummary = summary.split("NEWSECTION").join(" ");
                user.wordCount = user.wordCount - wordCount;
                user.totalWordsSummarized += wordCount;
                yield user.save();
                const sumId = yield handleSaveRecentSummary(user.id, url, saveSummary, title, privateSummary);
                return {
                    summary,
                    remainingSummaries: user.wordCount,
                    url,
                    id: sumId,
                    popout: user.settings.extensionSettings.popoutSummary,
                };
            }
            else {
                let summary;
                const response = yield openai.complete({
                    engine: "babbage-instruct-beta",
                    prompt: `List the key takeaways of the following article.\n\nText: ${text.trim()} \n\nKey Takeaways:`,
                    temperature: 0,
                    max_tokens: 160,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                const uneditedSummary = response.data.choices[0].text;
                const sentences = uneditedSummary
                    .replace(/\n/gm, " ")
                    .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/gm)
                    .filter((sentence) => {
                    if (!sentence.match(/\.$/gm))
                        return false;
                    return true;
                });
                summary = sentences
                    .join(" ")
                    .trim()
                    .replace(/[0-9]\.$/gm, "");
                const regex = /^[1]|^-/g;
                if (uneditedSummary.trim().match(regex)) {
                    summary = "The key takeaways of the text are as follows: " + summary;
                }
                else {
                    summary = summary;
                }
                user.wordCount = user.wordCount - wordCount;
                user.totalWordsSummarized += wordCount;
                yield user.save();
                const sumId = yield handleSaveRecentSummary(user.id, url, summary, title, privateSummary);
                try {
                    console.log(user.settings.extensionSettings.popoutSummary);
                }
                catch (err) {
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
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => SummaryReturnObj_1.SummaryReturnObj, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SummaryInputObj_1.SummaryInputObj, Object]),
    __metadata("design:returntype", Promise)
], SummarizeResolver.prototype, "summarize", null);
SummarizeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SummarizeResolver);
exports.SummarizeResolver = SummarizeResolver;
const handleCooldown = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const current_date = new Date();
    current_date.setMonth(current_date.getMonth() - 1);
    if (current_date.getTime() >= user.current_period) {
        user.wordCount = 25000;
        user.current_period = Date.now();
    }
    yield user.save();
});
const spliceLargeText = (text, wordCount) => {
    let [largestFactor, newWordCount] = determineLargestFactor(wordCount);
    if (largestFactor < 400) {
        return spliceLargeText(text, wordCount + 10);
    }
    console.log(largestFactor);
    const hashmap = sectionalizeText(largestFactor, newWordCount, text);
    console.log(hashmap);
    return hashmap;
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
const countWords = (text) => {
    const removeChar = text.replace(/[^A-Za-z]\s+/g, " ");
    const newWord = removeChar.trim().split(" ");
    return newWord.length;
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
const handleSaveRecentSummary = (userId, url, summary, title, privateSummary) => __awaiter(void 0, void 0, void 0, function* () {
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
        private: privateSummary,
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
//# sourceMappingURL=summarize.js.map
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
const utils_1 = require("./utils");
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
let SummarizeResolver = class SummarizeResolver {
    summarize({ text, url, title, privateSummary, actionType }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: [
                    "recentSummaries",
                    "settings",
                    "settings.extensionSettings",
                    "onboarding",
                ],
            });
            if (!user)
                return undefined;
            if (!actionType) {
                actionType = "entire";
            }
            let privated = privateSummary;
            if (privated === undefined || privated === null) {
                privated = false;
            }
            const wordCount = (0, utils_1.countWords)(text);
            console.log(text, wordCount);
            if (!user.prem)
                yield (0, utils_1.handleCooldown)(user);
            if (user.wordCount < wordCount)
                return undefined;
            let testSum;
            if (actionType === "entire") {
                testSum = yield RecentSummaries_1.RecentSummaries.findOne({
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
            if (wordCount > 1200) {
                const textArr = (0, utils_1.spliceLargeText)(text, wordCount);
                const summary = yield (0, utils_1.handlePromiseChain)(textArr);
                const saveSummary = summary.split("NEWSECTION").join(" ");
                user.wordCount = user.wordCount - wordCount;
                user.totalWordsSummarized += wordCount;
                yield user.save();
                const sumId = yield (0, utils_1.handleSaveRecentSummary)(user.id, url, saveSummary, title, privated, actionType);
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
                const sumId = yield (0, utils_1.handleSaveRecentSummary)(user.id, url, summary, title, privated, actionType);
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
//# sourceMappingURL=summarize.js.map
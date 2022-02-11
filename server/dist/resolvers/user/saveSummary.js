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
exports.SaveSummaryResolver = void 0;
const SaveSummaryInputObj_1 = require("./../../types/SaveSummaryInputObj");
const type_graphql_1 = require("type-graphql");
const SavedSummary_1 = require("./../../entities/SavedSummary");
const User_1 = require("./../../entities/User");
let SaveSummaryResolver = class SaveSummaryResolver {
    saveSummary({ email, sub, summary, url }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (email) {
                user = yield User_1.User.findOne({ where: { email }, relations: ["summaries"] });
            }
            else if (sub) {
                user = yield User_1.User.findOne({
                    where: { googleSubKey: sub },
                    relations: ["summaries"],
                });
            }
            if (!user)
                return undefined;
            const newSummarySave = SavedSummary_1.SavedSummary.create({
                author: user,
                url,
                summary,
            });
            user.summaries = [...user.summaries, newSummarySave];
            yield user.save();
            return newSummarySave;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => SavedSummary_1.SavedSummary, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SaveSummaryInputObj_1.SaveSummaryInputObj]),
    __metadata("design:returntype", Promise)
], SaveSummaryResolver.prototype, "saveSummary", null);
SaveSummaryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SaveSummaryResolver);
exports.SaveSummaryResolver = SaveSummaryResolver;
//# sourceMappingURL=saveSummary.js.map
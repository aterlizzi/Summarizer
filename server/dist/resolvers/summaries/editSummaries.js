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
exports.EditSummariesResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const RecentSummaries_1 = require("./../../entities/RecentSummaries");
const type_graphql_1 = require("type-graphql");
let EditSummariesResolver = class EditSummariesResolver {
    editSummary(id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield RecentSummaries_1.RecentSummaries.findOne({ where: { id } });
            if (!summary)
                return false;
            if (summary.rating) {
                const currentRating = summary.rating;
                summary.rating =
                    (currentRating * summary.numberOfRatings + rating) /
                        (summary.numberOfRatings + 1);
                summary.numberOfRatings += 1;
            }
            else {
                summary.rating = rating;
                summary.numberOfRatings += 1;
            }
            yield summary.save();
            return true;
        });
    }
    editSummaryPrivateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield RecentSummaries_1.RecentSummaries.findOne({ where: { id } });
            if (!summary)
                return false;
            summary.private = status;
            yield summary.save();
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("rating")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EditSummariesResolver.prototype, "editSummary", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], EditSummariesResolver.prototype, "editSummaryPrivateStatus", null);
EditSummariesResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], EditSummariesResolver);
exports.EditSummariesResolver = EditSummariesResolver;
//# sourceMappingURL=editSummaries.js.map
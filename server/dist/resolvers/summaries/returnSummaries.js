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
exports.ReturnSummariesResolver = void 0;
const UserRelationship_1 = require("./../../entities/UserRelationship");
const isAuth_1 = require("./../../middlewares/isAuth");
const RecentSummaries_1 = require("./../../entities/RecentSummaries");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const _ = require("lodash");
let ReturnSummariesResolver = class ReturnSummariesResolver {
    returnSummaries() {
        return __awaiter(this, void 0, void 0, function* () {
            const summaries = yield RecentSummaries_1.RecentSummaries.find();
            return summaries;
        });
    }
    returnUserSummaries({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
            });
            if (!user)
                return [];
            const recentSummaries = RecentSummaries_1.RecentSummaries.find({
                relations: ["user"],
                where: { user },
                take: 5,
                order: { id: "DESC" },
            });
            return recentSummaries;
        });
    }
    returnSummary({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (!user)
                return;
            const recentSummary = yield RecentSummaries_1.RecentSummaries.findOne({
                where: { id },
                relations: [
                    "user",
                    "user.settings",
                    "user.settings.extensionSettings",
                    "user.relationshipOne",
                    "user.relationshipTwo",
                    "user.relationshipOne.userTwo",
                    "user.relationshipTwo.userOne",
                ],
            });
            if (!recentSummary)
                return;
            if (recentSummary.user.settings.extensionSettings.onlyFriendsCanView &&
                recentSummary.user.id !== user.id) {
                const friends = [
                    ...recentSummary.user.relationshipOne,
                    ...recentSummary.user.relationshipTwo,
                ];
                const filteredFriends = friends.filter((relationship) => {
                    if (relationship.type !== "friends")
                        return false;
                    if (relationship.userOne && relationship.userOne.id !== user.id)
                        return false;
                    if (relationship.userTwo && relationship.userTwo.id !== user.id)
                        return false;
                    return true;
                });
                if (filteredFriends.length === 0)
                    return;
            }
            return recentSummary;
        });
    }
    returnFriendsRecentSummaries({ payload }, take) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (!user)
                return [];
            const relationshipsOne = yield UserRelationship_1.UserRelationship.find({
                where: { userOne: user, type: "friends" },
                relations: [
                    "userTwo",
                    "userTwo.recentSummaries",
                    "userTwo.recentSummaries.user",
                ],
            });
            const relationshipsTwo = yield UserRelationship_1.UserRelationship.find({
                where: { userTwo: user, type: "friends" },
                relations: [
                    "userOne",
                    "userOne.recentSummaries",
                    "userOne.recentSummaries.user",
                ],
            });
            if (relationshipsOne.length === 0 && relationshipsTwo.length === 0)
                return [];
            const relationshipOneArr = relationshipsOne.map((relationship) => {
                return relationship.userTwo.recentSummaries;
            });
            const relationshipTwoArr = relationshipsTwo.map((relationship) => {
                return relationship.userOne.recentSummaries;
            });
            const relationships = [...relationshipOneArr, ...relationshipTwoArr].flat();
            const sortedRelationships = _.orderBy(relationships, "createdAt", "desc");
            sortedRelationships.length = take;
            return sortedRelationships;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [RecentSummaries_1.RecentSummaries], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReturnSummariesResolver.prototype, "returnSummaries", null);
__decorate([
    (0, type_graphql_1.Query)(() => [RecentSummaries_1.RecentSummaries]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReturnSummariesResolver.prototype, "returnUserSummaries", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => RecentSummaries_1.RecentSummaries, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReturnSummariesResolver.prototype, "returnSummary", null);
__decorate([
    (0, type_graphql_1.Query)(() => [RecentSummaries_1.RecentSummaries]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("take")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReturnSummariesResolver.prototype, "returnFriendsRecentSummaries", null);
ReturnSummariesResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReturnSummariesResolver);
exports.ReturnSummariesResolver = ReturnSummariesResolver;
//# sourceMappingURL=returnSummaries.js.map
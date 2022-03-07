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
exports.FriendResolver = void 0;
const UserRelationship_1 = require("./../../entities/UserRelationship");
const isAuth_1 = require("./../../middlewares/isAuth");
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
let FriendResolver = class FriendResolver {
    sendFriendRequest(friendId, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
            });
            const friend = yield User_1.User.findOne({
                where: { id: friendId },
            });
            if (!user || !friend)
                return false;
            const currentRelationship = yield UserRelationship_1.UserRelationship.findOne({
                where: { userOne: user, userTwo: friend, type: "friends" },
            });
            if (currentRelationship)
                return false;
            const currentTwoRelationship = yield UserRelationship_1.UserRelationship.findOne({
                where: { userOne: friend, userTwo: user, type: "friends" },
            });
            if (currentTwoRelationship)
                return false;
            const pendingOneRelationship = yield UserRelationship_1.UserRelationship.findOne({
                where: { userOne: user, userTwo: friend, type: "pending_friend_request" },
            });
            if (pendingOneRelationship)
                return false;
            const pendingTwoRelationship = yield UserRelationship_1.UserRelationship.findOne({
                where: { userOne: friend, userTwo: user, type: "pending_friend_request" },
            });
            if (pendingTwoRelationship)
                return false;
            const newRelationship = UserRelationship_1.UserRelationship.create({
                userOne: user,
                userTwo: friend,
                type: "pending_friend_request",
            });
            yield newRelationship.save();
            return true;
        });
    }
    sendAidanFriendRequest({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
            });
            const friend = yield User_1.User.findOne({ where: { username: "Terlizzi" } });
            if (!user || !friend)
                return false;
            const newRelationship = UserRelationship_1.UserRelationship.create({
                userOne: user,
                userTwo: friend,
                type: "friends",
            });
            yield newRelationship.save();
            return true;
        });
    }
    acceptFriendRequest(username, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["relationshipTwo"],
            });
            const friend = yield User_1.User.findOne({
                where: { username },
            });
            if (!user || !friend)
                return false;
            const relationship = yield UserRelationship_1.UserRelationship.findOne({
                where: { userOne: friend, userTwo: user, type: "pending_friend_request" },
            });
            if (!relationship)
                return false;
            relationship.type = "friends";
            yield relationship.save();
            return true;
        });
    }
    declineFriendRequest(username, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["relationshipTwo"],
            });
            const friend = yield User_1.User.findOne({
                where: { username },
            });
            if (!user || !friend)
                return false;
            const relationship = yield UserRelationship_1.UserRelationship.findOne({
                where: { userOne: friend, userTwo: user, type: "pending_friend_request" },
            });
            if (!relationship)
                return false;
            yield UserRelationship_1.UserRelationship.delete(relationship.id);
            return true;
        });
    }
    returnRelationships() {
        return __awaiter(this, void 0, void 0, function* () {
            const relationships = yield UserRelationship_1.UserRelationship.find({
                relations: ["userOne", "userTwo"],
            });
            return relationships;
        });
    }
    returnFriendships({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: [
                    "relationshipOne",
                    "relationshipTwo",
                    "relationshipOne.userTwo",
                    "relationshipTwo.userOne",
                ],
            });
            if (!user)
                return [];
            const relationOne = user.relationshipOne.filter((relationship) => relationship.type === "friends");
            const relationTwo = user.relationshipTwo.filter((relationship) => relationship.type === "friends");
            const friendOne = relationOne.map((friend) => friend.userTwo);
            const friendTwo = relationTwo.map((friend) => friend.userOne);
            return [...friendOne, ...friendTwo];
        });
    }
    deleteRelationship(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserRelationship_1.UserRelationship.delete(id);
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("friendId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "sendFriendRequest", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "sendAidanFriendRequest", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "acceptFriendRequest", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "declineFriendRequest", null);
__decorate([
    (0, type_graphql_1.Query)(() => [UserRelationship_1.UserRelationship]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "returnRelationships", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "returnFriendships", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FriendResolver.prototype, "deleteRelationship", null);
FriendResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FriendResolver);
exports.FriendResolver = FriendResolver;
//# sourceMappingURL=friends.js.map
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
exports.SearchResolver = void 0;
const Groups_1 = require("./../../entities/Groups");
const RecentSummaries_1 = require("./../../entities/RecentSummaries");
const Bundle_1 = require("./../../entities/Bundle");
const searchOutput_1 = require("./../../types/search/searchOutput");
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const typeorm_1 = require("typeorm");
let SearchResolver = class SearchResolver {
    search(query, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            console.log(query);
            if (!user || query === "" || query === " ")
                return {
                    bundles: [],
                    groups: [],
                    users: [],
                    articles: [],
                };
            const bundles = yield Bundle_1.Bundle.find({ where: { title: (0, typeorm_1.Like)(`%${query}%`) } });
            const articles = yield RecentSummaries_1.RecentSummaries.find({
                where: { title: (0, typeorm_1.Like)(`%${query}%`) },
            });
            const tempUsers = yield User_1.User.find({
                where: { username: (0, typeorm_1.Like)(`%${query}%`) },
            });
            const groups = yield Groups_1.Groups.find({ where: { name: (0, typeorm_1.Like)(`%${query}%`) } });
            const users = tempUsers.filter((tempUser) => {
                if (user.id === tempUser.id)
                    return false;
                return true;
            });
            return {
                bundles,
                articles,
                users,
                groups,
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => searchOutput_1.SearchOutput),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("query")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SearchResolver.prototype, "search", null);
SearchResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SearchResolver);
exports.SearchResolver = SearchResolver;
//# sourceMappingURL=search.js.map
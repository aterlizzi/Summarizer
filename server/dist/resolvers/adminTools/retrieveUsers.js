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
exports.FindUsersAdminResolver = void 0;
const isAdmin_1 = require("./../../middlewares/isAdmin");
const User_1 = require("./../../entities/User");
const type_graphql_1 = require("type-graphql");
let FindUsersAdminResolver = class FindUsersAdminResolver {
    findUsersAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find({
                relations: [
                    "settings",
                    "settings.emailSettings",
                    "recentSummaries",
                    "settings.extensionSettings",
                    "relationshipTwo",
                    "relationshipOne",
                    "relationshipTwo.userOne",
                    "relationshipOne.userTwo",
                ],
            });
            return users;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FindUsersAdminResolver.prototype, "findUsersAdmin", null);
FindUsersAdminResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FindUsersAdminResolver);
exports.FindUsersAdminResolver = FindUsersAdminResolver;
//# sourceMappingURL=retrieveUsers.js.map
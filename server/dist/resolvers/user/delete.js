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
exports.DeleteResolver = void 0;
const isAdmin_1 = require("./../../middlewares/isAdmin");
const EmailSettings_1 = require("./../../entities/EmailSettings");
const User_1 = require("./../../entities/User");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../../middlewares/isAuth");
const Settings_1 = require("../../entities/Settings");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let DeleteResolver = class DeleteResolver {
    deleteUser({ payload, reply }, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (email) {
                user = yield User_1.User.findOne({
                    where: { email },
                    relations: [
                        "settings",
                        "settings.emailSettings",
                        "recentSummaries",
                    ],
                });
            }
            else {
                user = yield User_1.User.findOne({
                    where: { id: payload.userId },
                    relations: [
                        "settings",
                        "settings.emailSettings",
                        "recentSummaries",
                    ],
                });
            }
            if (!user || user.admin)
                return false;
            if (user.subKey !== "" && user.prem) {
                try {
                    yield stripe.subscriptions.del(user.subKey);
                }
                catch (_a) {
                    return false;
                }
            }
            const settingsId = user.settings.id;
            const emailSettingsId = user.settings.emailSettings.id;
            yield EmailSettings_1.EmailSettings.delete(emailSettingsId);
            yield Settings_1.Settings.delete(settingsId);
            try {
                yield User_1.User.delete(user.id);
            }
            catch (err) {
                console.log(err);
            }
            reply.clearCookie("jid", { path: "/" });
            return true;
        });
    }
    deleteUserAdmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (email) {
                user = yield User_1.User.findOne({
                    where: { email },
                    relations: [
                        "settings",
                        "settings.emailSettings",
                        "recentSummaries",
                    ],
                });
            }
            if (!user || user.admin)
                return false;
            if (user.subKey !== "" && user.prem) {
                try {
                    yield stripe.subscriptions.del(user.subKey);
                }
                catch (_a) {
                    return false;
                }
            }
            const settingsId = user.settings.id;
            const emailSettingsId = user.settings.emailSettings.id;
            yield EmailSettings_1.EmailSettings.delete(emailSettingsId);
            yield Settings_1.Settings.delete(settingsId);
            try {
                yield User_1.User.delete(user.id);
            }
            catch (err) {
                console.log(err);
            }
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("email", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeleteResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)("email", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeleteResolver.prototype, "deleteUserAdmin", null);
DeleteResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], DeleteResolver);
exports.DeleteResolver = DeleteResolver;
//# sourceMappingURL=delete.js.map
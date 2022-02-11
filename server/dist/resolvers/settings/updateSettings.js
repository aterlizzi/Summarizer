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
exports.UpdateSettingsResolver = void 0;
const updateExtensionSettings_1 = require("./../../types/updateExtensionSettings");
const User_1 = require("./../../entities/User");
const updateEmailSettingsInput_1 = require("./../../types/updateEmailSettingsInput");
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
let UpdateSettingsResolver = class UpdateSettingsResolver {
    updateEmailSettings({ payload }, { news, surveys, business, features }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings", "settings.emailSettings"],
            });
            if (!user)
                return false;
            user.settings.emailSettings.monthlyNews = news;
            user.settings.emailSettings.improvementSurveys = surveys;
            user.settings.emailSettings.businessEmails = business;
            user.settings.emailSettings.featureReleases = features;
            yield user.save();
            return true;
        });
    }
    updateExtensionSettings({ payload }, { popout, onlyFriendsCanView, showSettings, referFriendLink, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings", "settings.extensionSettings"],
            });
            if (!user)
                return false;
            user.settings.extensionSettings.referFriendLink = referFriendLink;
            user.settings.extensionSettings.showSettingsLink = showSettings;
            user.settings.extensionSettings.onlyFriendsCanView = onlyFriendsCanView;
            user.settings.extensionSettings.popoutSummary = popout;
            yield user.save();
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateEmailSettingsInput_1.UpdateEmailSettingsInput]),
    __metadata("design:returntype", Promise)
], UpdateSettingsResolver.prototype, "updateEmailSettings", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateExtensionSettings_1.UpdateExtensionSettingsInput]),
    __metadata("design:returntype", Promise)
], UpdateSettingsResolver.prototype, "updateExtensionSettings", null);
UpdateSettingsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UpdateSettingsResolver);
exports.UpdateSettingsResolver = UpdateSettingsResolver;
//# sourceMappingURL=updateSettings.js.map
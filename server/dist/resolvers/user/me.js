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
exports.MeResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
let MeResolver = class MeResolver {
    me({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: [
                    "settings",
                    "settings.emailSettings",
                    "settings.extensionSettings",
                    "bundles",
                ],
            });
            if (!user)
                return undefined;
            yield handleCooldown(user.id);
            return user;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeResolver.prototype, "me", null);
MeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MeResolver);
exports.MeResolver = MeResolver;
const handleCooldown = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { id: userId } });
    if (!user)
        return;
    const current_date = new Date();
    current_date.setMonth(current_date.getMonth() - 1);
    if (current_date.getTime() >= user.current_period) {
        user.current_period = Date.now();
        user.wordCount += 25000;
        user.prem = false;
        user.paymentTier = "Free";
        yield user.save();
    }
});
//# sourceMappingURL=me.js.map
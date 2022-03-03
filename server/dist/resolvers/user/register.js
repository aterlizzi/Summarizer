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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResolver = void 0;
const ExtensionSettings_1 = require("./../../entities/ExtensionSettings");
const EmailSettings_1 = require("./../../entities/EmailSettings");
const confirmUserOutput_1 = require("./../../types/confirmUserOutput");
const jsonwebtoken_1 = require("jsonwebtoken");
const registerUserInput_1 = require("./../../types/registerUserInput");
const redisPrefixes_1 = require("./../../constants/redisPrefixes");
const redis_1 = require("./../../redis");
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("./../../entities/User");
const type_graphql_1 = require("type-graphql");
const confirmUser_1 = require("../../utils/emails/confirmUser");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const registerUserOutput_1 = require("../../types/registerUserOutput");
const Settings_1 = require("../../entities/Settings");
const uuid_1 = require("uuid");
const newUserEmail_1 = require("../../utils/emails/newUserEmail");
const voucher_codes = require("voucher-code-generator");
let RegisterResolver = class RegisterResolver {
    registerGoogleUser(token, usecase, referral, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedToken = (0, jwt_decode_1.default)(token);
            if (parsedToken.iss !== "accounts.google.com")
                return { accessToken: "" };
            const sub = parsedToken.sub;
            const user = yield User_1.User.findOne({ where: { googleSubKey: sub } });
            const user2 = yield User_1.User.findOne({ where: { email: parsedToken.email } });
            if (user || user2)
                return { accessToken: "" };
            const email = parsedToken.email;
            const picture = parsedToken.picture;
            const name = parsedToken.name;
            const newUser = User_1.User.create({
                email,
                picture,
                username: name,
                googleSubKey: sub,
                accountType: "google",
                reason: usecase ? usecase : "Personal",
            });
            const userSettings = Settings_1.Settings.create({
                user: newUser,
                ABTest: newUser.id % 2 == 0 ? "A" : "B",
            });
            const userEmailSettings = EmailSettings_1.EmailSettings.create({
                settings: userSettings,
            });
            const userExtensionSettings = ExtensionSettings_1.ExtensionSettings.create({
                settings: userSettings,
            });
            userSettings.emailSettings = userEmailSettings;
            userSettings.extensionSettings = userExtensionSettings;
            newUser.settings = userSettings;
            const code = yield generateCode();
            newUser.referralCode = code;
            (0, newUserEmail_1.sendNewUserEmail)(email, name);
            yield newUser.save();
            if (referral) {
                yield handleReferralCode(referral, newUser.id);
            }
            ctx.reply.setCookie("jid", (0, jsonwebtoken_1.sign)({ userId: newUser.id }, process.env.JWT_RT_SECRET_TOKEN, {
                expiresIn: "7d",
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/",
            });
            return {
                accessToken: (0, jsonwebtoken_1.sign)({ userId: newUser.id }, process.env.JWT_AT_SECRET_TOKEN, {
                    expiresIn: "15m",
                }),
            };
        });
    }
    registerWebUser({ email, password, reason, referral, username }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.User.findOne({ where: { email } });
            const usernameUser = yield User_1.User.findOne({ where: { username } });
            if (usernameUser) {
                return {
                    registered: false,
                    error: {
                        type: "Username",
                        message: "User with that username already exists.",
                    },
                };
            }
            if (user)
                return {
                    registered: false,
                    error: {
                        type: "Email",
                        message: "User with that email already exists.",
                    },
                };
            if (password.length > 255 || password.length < 8)
                return {
                    registered: false,
                    error: {
                        type: "Password",
                        message: "Your password must be greater than 8 characters and less than 255.",
                    },
                };
            const hash = yield argon2_1.default.hash(password);
            user = User_1.User.create({
                email,
                username,
                password: hash,
                accountType: "web",
                reason: reason ? reason : "Personal",
            });
            const userSettings = Settings_1.Settings.create({
                user,
                ABTest: user.id % 2 === 0 ? "A" : "B",
            });
            const userEmailSettings = EmailSettings_1.EmailSettings.create({ settings: userSettings });
            const userExtensionSettings = ExtensionSettings_1.ExtensionSettings.create({
                settings: userSettings,
            });
            userSettings.emailSettings = userEmailSettings;
            userSettings.extensionSettings = userExtensionSettings;
            user.settings = userSettings;
            const code = yield generateCode();
            user.referralCode = code;
            yield user.save();
            ctx.reply.setCookie("rid", (0, uuid_1.v4)());
            if (referral) {
                handleReferralCode(referral, user.id);
            }
            yield handleEmailSend(user);
            (0, newUserEmail_1.sendNewUserEmail)(email, username);
            return {
                registered: true,
                error: {},
            };
        });
    }
    resend(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user)
                return false;
            yield handleEmailSend(user);
            return true;
        });
    }
    confirmUser(code, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.registerUserToken + code);
            if (!userId)
                return { accessToken: "" };
            const user = yield User_1.User.findOne(userId);
            if (!user || user.confirmed)
                return { accessToken: "" };
            user.confirmed = true;
            yield user.save();
            yield redis_1.redis.del(redisPrefixes_1.registerUserToken + code);
            ctx.reply.clearCookie("rid");
            ctx.reply.setCookie("jid", (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_RT_SECRET_TOKEN, {
                expiresIn: "7d",
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/",
            });
            return {
                accessToken: (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN, {
                    expiresIn: "15m",
                }),
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => confirmUserOutput_1.ConfirmUserOutput),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __param(1, (0, type_graphql_1.Arg)("usecase")),
    __param(2, (0, type_graphql_1.Arg)("referral", { nullable: true })),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "registerGoogleUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => registerUserOutput_1.RegisterUserOutput),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUserInput_1.registerUserInput, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "registerWebUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "resend", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => confirmUserOutput_1.ConfirmUserOutput),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "confirmUser", null);
RegisterResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
const handleEmailSend = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const CODE = Math.floor(Math.random() * (9999 - 1000) + 1000);
    yield redis_1.redis.set(redisPrefixes_1.registerUserToken + CODE, user.id, "ex", 60 * 60 * 24);
    (0, confirmUser_1.sendConfirmationMail)(user.email, user.username, CODE.toString());
});
const generateCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const [code] = voucher_codes.generate({
        length: 8,
        count: 1,
    });
    const user = yield User_1.User.findOne({ where: { referralCode: code } });
    if (user) {
        generateCode();
    }
    else {
        return code;
    }
});
const handleReferralCode = (referral, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: { id: userId },
        relations: ["settings"],
    });
    if (!user)
        return;
    const referralUser = yield User_1.User.findOne({
        where: { referralCode: referral },
        relations: ["settings"],
    });
    if (!referralUser)
        return;
    referralUser.settings.totalRefers += 1;
    const totalRefers = referralUser.settings.totalRefers;
    if (totalRefers > 15) {
        referralUser.wordCount += 20000;
        user.settings.referralDiscount = 10;
    }
    if (totalRefers === 15) {
        referralUser.wordCount += 20000;
        user.settings.referralDiscount = 10;
        yield handleFreePremium(referralUser.id);
    }
    if (totalRefers < 15 && totalRefers >= 10) {
        referralUser.wordCount += 15000;
        user.settings.referralDiscount = 10;
        referralUser.settings.referralDiscount = 15;
    }
    if (totalRefers < 10) {
        referralUser.wordCount += 10000;
        user.settings.referralDiscount = 10;
        referralUser.settings.referralDiscount = 10;
    }
    yield referralUser.save();
    yield user.save();
});
const handleFreePremium = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { id: userId } });
    if (!user)
        return;
    user.prem = true;
    user.paymentTier = "Student";
    user.wordCount = 150000;
    user.current_period = Date.now();
    user.settings.freePrem = true;
});
//# sourceMappingURL=register.js.map
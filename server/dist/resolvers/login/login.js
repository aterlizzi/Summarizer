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
exports.LoginResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const loginOutput_1 = require("./../../types/loginOutput");
const User_1 = require("./../../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const jsonwebtoken_1 = require("jsonwebtoken");
let LoginResolver = class LoginResolver {
    hello() {
        return "Hello world.";
    }
    verifyGoogleUser(token, subKey, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            let sub;
            if (token) {
                const parsedToken = (0, jwt_decode_1.default)(token);
                sub = parsedToken.sub;
            }
            if (subKey) {
                sub = subKey;
            }
            user = yield User_1.User.findOne({ where: { googleSubKey: sub } });
            if (!user) {
                return {
                    logged: false,
                    error: { message: "Either your email or password is incorrect." },
                    tier: "",
                    wordCount: 0,
                    accessToken: "",
                };
            }
            ctx.reply.setCookie("jid", (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_RT_SECRET_TOKEN, {
                expiresIn: "7d",
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/",
            });
            return {
                logged: true,
                error: {},
                tier: user.paymentTier,
                wordCount: user.wordCount,
                accessToken: (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN, {
                    expiresIn: "15m",
                }),
            };
        });
    }
    verifyUser(email, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user)
                return {
                    logged: false,
                    error: { message: "Either your email or password is incorrect." },
                    tier: "",
                    wordCount: 0,
                    accessToken: "",
                };
            if (user.accountType !== "web")
                return {
                    logged: false,
                    error: { message: "Either your email or password is incorrect." },
                    tier: "",
                    wordCount: 0,
                    accessToken: "",
                };
            if (!(yield argon2_1.default.verify(user.password, password)))
                return {
                    logged: false,
                    error: { message: "Either your email or password is incorrect." },
                    tier: "",
                    wordCount: 0,
                    accessToken: "",
                };
            ctx.reply.setCookie("jid", (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_RT_SECRET_TOKEN, {
                expiresIn: "7d",
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/",
            });
            return {
                logged: true,
                error: {},
                tier: user.paymentTier,
                wordCount: user.wordCount,
                accessToken: (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN, {
                    expiresIn: "15m",
                }),
            };
        });
    }
    clickMe() {
        return "hello";
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], LoginResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => loginOutput_1.LoginOutput),
    __param(0, (0, type_graphql_1.Arg)("token", { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("sub", { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "verifyGoogleUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => loginOutput_1.LoginOutput),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "verifyUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], LoginResolver.prototype, "clickMe", null);
LoginResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LoginResolver);
exports.LoginResolver = LoginResolver;
//# sourceMappingURL=login.js.map
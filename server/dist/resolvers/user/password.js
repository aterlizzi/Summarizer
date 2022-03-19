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
exports.PasswordResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const confirmUserOutput_1 = require("./../../types/confirmUserOutput");
const uuid_1 = require("uuid");
const redis_1 = require("./../../redis");
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
const redisPrefixes_1 = require("../../constants/redisPrefixes");
const forgotPasswordEmail_1 = require("../../utils/emails/forgotPasswordEmail");
const jsonwebtoken_1 = require("jsonwebtoken");
let PasswordResolver = class PasswordResolver {
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user)
                return `Reset password email sent to ${email}`;
            const usersEmail = user.email;
            const token = (0, uuid_1.v4)();
            yield redis_1.redis.set(redisPrefixes_1.forgotPasswordToken + token, user.id, "ex", 60 * 60 * 24);
            (0, forgotPasswordEmail_1.sendForgotPasswordEmail)(usersEmail, token, user.username);
            return `Reset password email sent to ${email}`;
        });
    }
    confirmForgotPassword(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.forgotPasswordToken + token);
            if (!userId)
                return "";
            const user = yield User_1.User.findOne({ where: { id: userId } });
            if (!user)
                return "";
            yield redis_1.redis.del(redisPrefixes_1.forgotPasswordToken + token);
            return userId;
        });
    }
    changePassword(password, id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id } });
            if (!user)
                return { accessToken: "" };
            const hash = yield argon2_1.default.hash(password);
            user.password = hash;
            yield user.save();
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
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordResolver.prototype, "forgotPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordResolver.prototype, "confirmForgotPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => confirmUserOutput_1.ConfirmUserOutput),
    __param(0, (0, type_graphql_1.Arg)("password")),
    __param(1, (0, type_graphql_1.Arg)("id")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PasswordResolver.prototype, "changePassword", null);
PasswordResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PasswordResolver);
exports.PasswordResolver = PasswordResolver;
//# sourceMappingURL=password.js.map
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
exports.ChangeEmailResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const redis_1 = require("./../../redis");
const changeEmail_1 = require("./../../types/changeEmail");
const User_1 = require("./../../entities/User");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../../middlewares/isAuth");
const redisPrefixes_1 = require("../../constants/redisPrefixes");
const uuid_1 = require("uuid");
const changeEmail_2 = require("../../utils/emails/changeEmail/changeEmail");
const changedEmailToOwner_1 = require("../../utils/emails/changeEmail/changedEmailToOwner");
let ChangeEmailResolver = class ChangeEmailResolver {
    changeEmail({ payload }, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            const possibleUser = yield User_1.User.findOne({ where: { email } });
            if (!user)
                return { success: false, error: "Not authenticated." };
            if (possibleUser)
                return { success: false, error: "User with that email already exists." };
            user.tempChangeEmail = email;
            yield user.save();
            const CODE = (0, uuid_1.v4)();
            yield redis_1.redis.set(redisPrefixes_1.changeEmailToken + CODE, user.id, "ex", 60 * 60 * 24);
            yield (0, changeEmail_2.sendChangeEmailMail)(user.username, email, CODE);
            (0, changedEmailToOwner_1.sendChangeEmailToOwnerMail)(user.username, user.email);
            return { success: true, error: "" };
        });
    }
    confirmChangeEmail(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.changeEmailToken + token);
            if (!userId)
                return false;
            const user = yield User_1.User.findOne({ where: { id: userId } });
            if (!user)
                return false;
            if (!(yield argon2_1.default.verify(user.password, password)))
                return false;
            yield redis_1.redis.del(redisPrefixes_1.changeEmailToken + token);
            const newEmail = user.tempChangeEmail;
            user.tempChangeEmail = "";
            user.email = newEmail;
            yield user.save();
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => changeEmail_1.ChangeEmailOutput),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChangeEmailResolver.prototype, "changeEmail", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChangeEmailResolver.prototype, "confirmChangeEmail", null);
ChangeEmailResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ChangeEmailResolver);
exports.ChangeEmailResolver = ChangeEmailResolver;
//# sourceMappingURL=changeEmail.js.map
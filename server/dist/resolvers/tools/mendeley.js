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
exports.MendeleyResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const axios_1 = __importDefault(require("axios"));
let MendeleyResolver = class MendeleyResolver {
    authMendeley({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.mendeley.com/oauth/authorize?client_id=${process.env.MENDELEY_CLIENT_ID}&redirect_uri=http:%2F%2Flocalhost:3000%2Fauth%2Fmendeley&response_type=code&scope=all&state=${Math.random() * 1000000000}`;
            return url;
        });
    }
    retrieveMendeleyToken(code, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || user.settings.mendeleyConnected)
                return false;
            const credential = Buffer.from(process.env.MENDELEY_CLIENT_ID + ":" + process.env.MENDELEY_CLIENT_SECRET).toString("base64");
            try {
                const responseObject = yield (0, axios_1.default)({
                    headers: {
                        Authorization: `Basic ${credential}`,
                    },
                    data: {
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: "http://localhost:3000/auth/mendeley",
                    },
                    url: "https://api.mendeley.com/oauth/token",
                    method: "POST",
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MendeleyResolver.prototype, "authMendeley", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MendeleyResolver.prototype, "retrieveMendeleyToken", null);
MendeleyResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MendeleyResolver);
exports.MendeleyResolver = MendeleyResolver;
//# sourceMappingURL=mendeley.js.map
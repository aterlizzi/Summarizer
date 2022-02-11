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
exports.GoogleResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const User_1 = require("../../entities/User");
let GoogleResolver = class GoogleResolver {
    authGoogle({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || user.settings.googleConnected)
                return "";
            const rooturl = "https://accounts.google.com/o/oauth2/v2/auth";
            const options = {
                redirect_uri: "http://localhost:3000/auth/google",
                client_id: process.env.GOOGLE_CLIENT_ID,
                access_type: "offline",
                response_type: "code",
                prompt: "consent",
                scope: [
                    "https://www.googleapis.com/auth/gmail.modify",
                    "https://www.googleapis.com/auth/userinfo.email",
                ].join(" "),
            };
            const url = `${rooturl}?${querystring_1.default.stringify(options)}`;
            console.log(url);
            return url;
        });
    }
    retrieveGoogleToken(code, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || user.settings.googleConnected)
                return false;
            const url = "https://oauth2.googleapis.com/token";
            const values = {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: "http://localhost:3000/auth/google",
                grant_type: "authorization_code",
            };
            const googleResponseData = yield axios_1.default
                .post(url, querystring_1.default.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
                .then((res) => res.data)
                .catch((error) => {
                console.error(`Failed to fetch auth tokens`);
                throw new Error(error.message);
            });
            if (googleResponseData) {
                const googleUserData = yield axios_1.default
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponseData.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${googleResponseData.refresh_token}`,
                    },
                })
                    .then((res) => res.data)
                    .catch((error) => {
                    console.error(`Failed to fetch user`);
                    throw new Error(error.message);
                });
                user.settings.googleMainEmail = googleUserData.email;
                user.settings.googleUserId = googleUserData.id;
                user.settings.googleAccessToken = googleResponseData.access_token;
                user.settings.googleRefreshToken = googleResponseData.refresh_token;
                user.settings.googleExpiresIn = googleResponseData.expires_in;
                user.settings.googleConnected = true;
            }
            yield user.save();
            return true;
        });
    }
    clearGoogle({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.googleConnected)
                return false;
            user.settings.googleMainEmail = "";
            user.settings.googleUserId = "";
            user.settings.googleAccessToken = "";
            user.settings.googleRefreshToken = "";
            user.settings.googleExpiresIn = undefined;
            user.settings.googleConnected = false;
            yield user.save();
            return true;
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
], GoogleResolver.prototype, "authGoogle", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoogleResolver.prototype, "retrieveGoogleToken", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleResolver.prototype, "clearGoogle", null);
GoogleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GoogleResolver);
exports.GoogleResolver = GoogleResolver;
//# sourceMappingURL=google.js.map
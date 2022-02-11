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
exports.ZoteroResolver = void 0;
const ZoteroFindItemsOutput_1 = require("./../../types/zotero/ZoteroFindItemsOutput");
const ZoteroCreateWPInput_1 = require("./../../types/zotero/ZoteroCreateWPInput");
const ZoteroCollectionsReturnObj_1 = require("../../types/zotero/ZoteroCollectionsReturnObj");
const isAuth_1 = require("./../../middlewares/isAuth");
const User_1 = require("./../../entities/User");
const type_graphql_1 = require("type-graphql");
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const OAuth = require("oauth-1.0a");
let ZoteroResolver = class ZoteroResolver {
    authZotero({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user)
                return "";
            if (user.settings.zoteroConnected)
                return "";
            let url;
            const oauth = OAuth({
                consumer: {
                    key: process.env.ZOTERO_CLIENT_KEY,
                    secret: process.env.ZOTERO_CLIENT_SECRET,
                },
                signature_method: "HMAC-SHA1",
                hash_function(base_string, key) {
                    return crypto_1.default
                        .createHmac("sha1", key)
                        .update(base_string)
                        .digest("base64");
                },
            });
            if (user.settings.zoteroRequestToken === "") {
                const tokenRequestConfig = {
                    url: "https://www.zotero.org/oauth/request",
                    method: "POST",
                    data: {
                        oauth_callback: "http://localhost:3000/auth/zotero",
                    },
                };
                const tokenRequestResponse = yield (0, axios_1.default)({
                    url: "https://www.zotero.org/oauth/request",
                    method: "POST",
                    headers: oauth.toHeader(oauth.authorize(tokenRequestConfig)),
                });
                const tokenRequestData = tokenRequestResponse.data;
                const obj = {};
                tokenRequestData.replace(/([^=&]+)=([^&]*)/g, (_, key, value) => {
                    obj[decodeURIComponent(key)] = decodeURIComponent(value);
                });
                const oAuthToken = obj["oauth_token"];
                const oAuthTokenSecret = obj["oauth_token_secret"];
                url = `https://www.zotero.org/oauth/authorize?oauth_token=${oAuthToken}&library_access=1&notes_access=1&write_access=1&all_groups=write`;
                user.settings.zoteroRequestSecret = oAuthTokenSecret;
                user.settings.zoteroRequestToken = oAuthToken;
                yield user.save();
            }
            else {
                const oAuthToken = user.settings.zoteroRequestToken;
                url = `https://www.zotero.org/oauth/authorize?oauth_token=${oAuthToken}&library_access=1&notes_access=1&write_access=1&all_groups=write`;
            }
            return url;
        });
    }
    getAccessTokenZotero(verifier, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user)
                return false;
            const oAuthToken = user.settings.zoteroRequestToken;
            const oAuthTokenSecret = user.settings.zoteroRequestSecret;
            const oAuthVerifier = verifier;
            const oauth = OAuth({
                consumer: {
                    key: process.env.ZOTERO_CLIENT_KEY,
                    secret: process.env.ZOTERO_CLIENT_SECRET,
                },
                signature_method: "HMAC-SHA1",
                hash_function(base_string, key) {
                    return crypto_1.default
                        .createHmac("sha1", key)
                        .update(base_string)
                        .digest("base64");
                },
            });
            const tokenExchangeConfig = {
                url: `https://www.zotero.org/oauth/access?oauth_token=${oAuthToken}`,
                method: "POST",
                data: {
                    oauth_verifier: oAuthVerifier,
                },
            };
            const tokenExchangeResponse = yield (0, axios_1.default)({
                url: `https://www.zotero.org/oauth/access?oauth_token=${oAuthToken}`,
                headers: oauth.toHeader(oauth.authorize(tokenExchangeConfig, {
                    public: oAuthToken,
                    secret: oAuthTokenSecret,
                })),
                method: "POST",
            });
            const tokenExchangeData = tokenExchangeResponse.data;
            const userId = tokenExchangeData.match(/userID=([0-9]+)/)[1];
            const userAPIKey = tokenExchangeData.match(/oauth_token_secret=([a-zA-Z0-9]+)/)[1];
            console.log(typeof userId);
            user.settings.zoteroUserId = userId;
            user.settings.zoteroAPIKey = userAPIKey;
            user.settings.zoteroRequestSecret = "";
            user.settings.zoteroRequestToken = "";
            user.settings.zoteroConnected = true;
            yield user.save();
            return true;
        });
    }
    clearZotero({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.zoteroConnected)
                return false;
            user.settings.zoteroConnected = false;
            user.settings.zoteroAPIKey = "";
            user.settings.zoteroRequestSecret = "";
            user.settings.zoteroRequestToken = "";
            user.settings.zoteroUserId = "";
            yield user.save();
            return true;
        });
    }
    returnZoteroCollections({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.zoteroConnected)
                return undefined;
            const newTemplateResponse = yield (0, axios_1.default)({
                headers: {
                    Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
                },
                method: "GET",
                url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/collections`,
            });
            const collections = newTemplateResponse.data;
            return collections.map((collection) => ({
                collectionName: collection.data.name,
                collectionKey: collection.data.key,
            }));
        });
    }
    createNewWebPageZotero({ payload }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let attachedNoteResponse;
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.zoteroConnected)
                return false;
            const newTemplateResponse = yield (0, axios_1.default)({
                method: "GET",
                url: "https://api.zotero.org/items/new?itemType=webpage",
            });
            const template = newTemplateResponse.data;
            template.collections = [options.collection];
            template.title = options.title;
            if (options.url) {
                template.url = options.url;
            }
            template.accessDate = new Date().toISOString;
            const newItemResponse = yield (0, axios_1.default)({
                headers: {
                    Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
                },
                method: "POST",
                url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/items`,
                data: [template],
            });
            if (newItemResponse.data.successful) {
                const itemKey = newItemResponse.data.successful["0"].key;
                const noteTemplate = {
                    itemType: "note",
                    note: options.summary,
                    tags: [],
                    parentItem: itemKey,
                    relations: {},
                };
                attachedNoteResponse = yield (0, axios_1.default)({
                    headers: {
                        Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
                    },
                    method: "POST",
                    url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/items`,
                    data: [noteTemplate],
                });
            }
            if (attachedNoteResponse === null || attachedNoteResponse === void 0 ? void 0 : attachedNoteResponse.data.successful) {
                return true;
            }
            return false;
        });
    }
    findZoteroItems({ payload }, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.zoteroConnected)
                return undefined;
            const findItemsResponse = yield (0, axios_1.default)({
                headers: {
                    Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
                },
                method: "GET",
                url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/collections/${collection}/items`,
            });
            const items = findItemsResponse.data.filter((item) => {
                if (item.data.itemType === "note")
                    return false;
                return true;
            });
            return items.map((item) => ({
                title: item.data.title,
                key: item.data.key,
                itemType: item.data.itemType,
            }));
        });
    }
    addNoteToItemZotero({ payload }, item, summary) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.zoteroConnected)
                return false;
            const noteTemplate = {
                itemType: "note",
                note: summary,
                tags: [],
                parentItem: item,
                relations: {},
            };
            const attachedNoteResponse = yield (0, axios_1.default)({
                headers: {
                    Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
                },
                method: "POST",
                url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/items`,
                data: [noteTemplate],
            });
            if (attachedNoteResponse.data.successful) {
                return true;
            }
            return false;
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
], ZoteroResolver.prototype, "authZotero", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("verifier")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ZoteroResolver.prototype, "getAccessTokenZotero", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZoteroResolver.prototype, "clearZotero", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ZoteroCollectionsReturnObj_1.Collection], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZoteroResolver.prototype, "returnZoteroCollections", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ZoteroCreateWPInput_1.CreateWPInput]),
    __metadata("design:returntype", Promise)
], ZoteroResolver.prototype, "createNewWebPageZotero", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ZoteroFindItemsOutput_1.ZoteroFindItemsOutput], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("collection")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ZoteroResolver.prototype, "findZoteroItems", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("item")),
    __param(2, (0, type_graphql_1.Arg)("summary")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ZoteroResolver.prototype, "addNoteToItemZotero", null);
ZoteroResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ZoteroResolver);
exports.ZoteroResolver = ZoteroResolver;
//# sourceMappingURL=zotero.js.map
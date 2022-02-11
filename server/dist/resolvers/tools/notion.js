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
exports.NotionResolver = void 0;
const NotionPagesOutput_1 = require("./../../types/notion/NotionPagesOutput");
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const axios_1 = __importDefault(require("axios"));
const User_1 = require("../../entities/User");
const NotionDatabaseOutput_1 = require("../../types/notion/NotionDatabaseOutput");
const NotionCPInput_1 = require("../../types/notion/NotionCPInput");
const { Client } = require("@notionhq/client");
let NotionResolver = class NotionResolver {
    authNotion({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || user.settings.notionConnected)
                return "";
            const url = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NOTION_CLIENT_ID}&redirect_uri=${encodeURIComponent("http://localhost:3000/auth/notion")}&response_type=code`;
            return url;
        });
    }
    retrieveNotionToken(code, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || user.settings.notionConnected)
                return false;
            const credential = Buffer.from(process.env.NOTION_CLIENT_ID + ":" + process.env.NOTION_CLIENT_SECRET).toString("base64");
            const responseObject = yield (0, axios_1.default)({
                headers: {
                    Authorization: `Basic ${credential}`,
                },
                data: {
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: "http://localhost:3000/auth/notion",
                },
                url: "https://api.notion.com/v1/oauth/token",
                method: "POST",
            });
            const data = responseObject.data;
            user.settings.notionAccessToken = data.access_token;
            user.settings.notionBotId = data.bot_id;
            user.settings.notionConnected = true;
            user.settings.notionUserId = data.owner.user.id;
            user.settings.notionWorkspaceIcon = data.workspace_icon;
            user.settings.notionWorkspaceId = data.workspace_id;
            user.settings.notionWorkspaceName = data.workspace_name;
            yield user.save();
            return true;
        });
    }
    clearNotion({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.notionConnected)
                return false;
            user.settings.notionAccessToken = "";
            user.settings.notionBotId = "";
            user.settings.notionConnected = false;
            user.settings.notionUserId = "";
            user.settings.notionWorkspaceIcon = "";
            user.settings.notionWorkspaceId = "";
            user.settings.notionWorkspaceName = "";
            yield user.save();
            return true;
        });
    }
    retrieveNotionDatabases({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.notionConnected)
                return undefined;
            const notion = new Client({ auth: user.settings.notionAccessToken });
            const response = yield notion.databases.list();
            const databases = response.results;
            return databases.map((database) => ({
                title: database.title[0].text.content,
                id: database.id,
            }));
        });
    }
    retrieveNotionPages({ payload }, database) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.notionConnected)
                return undefined;
            const notion = new Client({ auth: user.settings.notionAccessToken });
            const response = yield notion.databases.query({
                database_id: database,
                page_size: 100,
            });
            const pages = response.results;
            console.log(pages[0].properties.Name.title[0].text.content);
            return pages.map((database) => ({
                title: database.properties.Name.title[0].text.content,
                id: database.id,
            }));
        });
    }
    createNotionPageSummary({ payload }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user || !user.settings.notionConnected)
                return false;
            const parent = options.page
                ? { page_id: options.page }
                : { database_id: options.database };
            const summary = options.url
                ? { content: options.summary, link: { url: options.url } }
                : { content: options.summary };
            const notion = new Client({ auth: user.settings.notionAccessToken });
            const response = yield notion.pages.create({
                parent: parent,
                icon: {
                    type: "emoji",
                    emoji: "🧠",
                },
                properties: {
                    title: {
                        id: "title",
                        type: "title",
                        title: [
                            {
                                text: {
                                    content: options.title,
                                },
                            },
                        ],
                    },
                },
                children: [
                    {
                        object: "block",
                        type: "heading_1",
                        heading_1: {
                            text: [
                                {
                                    type: "text",
                                    text: {
                                        content: "Summary",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        object: "block",
                        type: "heading_3",
                        heading_3: {
                            text: [
                                {
                                    type: "text",
                                    text: {
                                        content: `Created ${new Date().toDateString()}`,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        object: "block",
                        type: "paragraph",
                        paragraph: {
                            text: [
                                {
                                    type: "text",
                                    text: summary,
                                },
                            ],
                        },
                    },
                ],
            });
            const page_id = response.id;
            console.log(response);
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
], NotionResolver.prototype, "authNotion", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotionResolver.prototype, "retrieveNotionToken", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotionResolver.prototype, "clearNotion", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [NotionDatabaseOutput_1.NotionDatabaseOutput], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotionResolver.prototype, "retrieveNotionDatabases", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [NotionPagesOutput_1.NotionPagesOutput], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("database")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotionResolver.prototype, "retrieveNotionPages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, NotionCPInput_1.NotionCreatePageInput]),
    __metadata("design:returntype", Promise)
], NotionResolver.prototype, "createNotionPageSummary", null);
NotionResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], NotionResolver);
exports.NotionResolver = NotionResolver;
//# sourceMappingURL=notion.js.map
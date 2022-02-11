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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const EmailSettings_1 = require("./EmailSettings");
const User_1 = require("./User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ExtensionSettings_1 = require("./ExtensionSettings");
let Settings = class Settings extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Settings.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Settings.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Settings.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "saveInDatabase", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: Date.now(), type: "bigint" }),
    __metadata("design:type", Number)
], Settings.prototype, "timeInStorage", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.OneToOne)(() => User_1.User, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Settings.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "zoteroAPIKey", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "zoteroUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "zoteroRequestToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "zoteroRequestSecret", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Settings.prototype, "zoteroConnected", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "notionAccessToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "notionBotId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "notionWorkspaceName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "notionWorkspaceIcon", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "notionWorkspaceId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "notionUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Settings.prototype, "notionConnected", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Settings.prototype, "googleConnected", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "googleAccessToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "googleRefreshToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Settings.prototype, "googleExpiresIn", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "googleUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Settings.prototype, "googleMainEmail", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Settings.prototype, "evernoteConnected", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Settings.prototype, "mendeleyConnected", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => EmailSettings_1.EmailSettings),
    (0, typeorm_1.OneToOne)(() => EmailSettings_1.EmailSettings, (emailSettings) => emailSettings.settings, {
        onDelete: "CASCADE",
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", EmailSettings_1.EmailSettings)
], Settings.prototype, "emailSettings", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExtensionSettings_1.ExtensionSettings, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => ExtensionSettings_1.ExtensionSettings, (extensionSettings) => extensionSettings.settings, { onDelete: "CASCADE", cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ExtensionSettings_1.ExtensionSettings)
], Settings.prototype, "extensionSettings", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "ABTest", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Settings.prototype, "totalRefers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Settings.prototype, "referralDiscount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Settings.prototype, "freePrem", void 0);
Settings = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Settings);
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map
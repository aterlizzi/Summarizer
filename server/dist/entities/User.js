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
exports.User = void 0;
const UserRelationship_1 = require("./UserRelationship");
const Bundle_1 = require("./Bundle");
const Groups_1 = require("./Groups");
const RecentSummaries_1 = require("./RecentSummaries");
const Settings_1 = require("./Settings");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const SavedSummary_1 = require("./SavedSummary");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "accountType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmed", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "Free" }),
    __metadata("design:type", String)
], User.prototype, "paymentTier", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: 25000 }),
    __metadata("design:type", Number)
], User.prototype, "wordCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "reason", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "googleSubKey", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [SavedSummary_1.SavedSummary]),
    (0, typeorm_1.OneToMany)(() => SavedSummary_1.SavedSummary, (summary) => summary.author, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "summaries", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "prem", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: Date.now(), type: "bigint" }),
    __metadata("design:type", Number)
], User.prototype, "current_period", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "custKey", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "subKey", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Settings_1.Settings, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => Settings_1.Settings, {
        cascade: true,
        nullable: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Settings_1.Settings)
], User.prototype, "settings", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "freeTrialed", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "trialing", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "creditCardFingerprint", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "onboardCompleted", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], User.prototype, "referralCode", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [RecentSummaries_1.RecentSummaries]),
    (0, typeorm_1.OneToMany)(() => RecentSummaries_1.RecentSummaries, (recentSummary) => recentSummary.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "recentSummaries", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Groups_1.Groups]),
    (0, typeorm_1.ManyToMany)(() => Groups_1.Groups, (group) => group.users, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "groups", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Bundle_1.Bundle]),
    (0, typeorm_1.OneToMany)(() => Bundle_1.Bundle, (group) => group.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "bundles", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "totalWordsSummarized", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [UserRelationship_1.UserRelationship]),
    (0, typeorm_1.OneToMany)(() => UserRelationship_1.UserRelationship, (relationship) => relationship.userOne),
    __metadata("design:type", Array)
], User.prototype, "relationshipOne", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [UserRelationship_1.UserRelationship]),
    (0, typeorm_1.OneToMany)(() => UserRelationship_1.UserRelationship, (relationship) => relationship.userTwo),
    __metadata("design:type", Array)
], User.prototype, "relationshipTwo", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map
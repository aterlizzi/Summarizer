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
exports.RecentSummaries = void 0;
const Groups_1 = require("./Groups");
const Bundle_1 = require("./Bundle");
const User_1 = require("./User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let RecentSummaries = class RecentSummaries extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecentSummaries.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecentSummaries.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecentSummaries.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.recentSummaries, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], RecentSummaries.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RecentSummaries.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecentSummaries.prototype, "summary", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], RecentSummaries.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: true }),
    (0, typeorm_1.Column)("decimal", { default: null }),
    __metadata("design:type", Number)
], RecentSummaries.prototype, "rating", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RecentSummaries.prototype, "numberOfRatings", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Bundle_1.Bundle]),
    (0, typeorm_1.ManyToMany)(() => Bundle_1.Bundle, (bundle) => bundle.summaries),
    __metadata("design:type", Array)
], RecentSummaries.prototype, "bundles", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Groups_1.Groups]),
    (0, typeorm_1.ManyToMany)(() => Groups_1.Groups, (group) => group.pinnedSummaries),
    __metadata("design:type", Array)
], RecentSummaries.prototype, "pinnedGroups", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Groups_1.Groups]),
    (0, typeorm_1.ManyToMany)(() => Groups_1.Groups, (group) => group.summaries),
    __metadata("design:type", Array)
], RecentSummaries.prototype, "groups", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RecentSummaries.prototype, "private", void 0);
RecentSummaries = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], RecentSummaries);
exports.RecentSummaries = RecentSummaries;
//# sourceMappingURL=RecentSummaries.js.map
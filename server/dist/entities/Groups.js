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
exports.Groups = void 0;
const RecentSummaries_1 = require("./RecentSummaries");
const User_1 = require("./User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Groups = class Groups extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Groups.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Groups.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Groups.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Groups.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.User]),
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.groups),
    __metadata("design:type", Array)
], Groups.prototype, "users", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.User]),
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.adminGroups),
    __metadata("design:type", Array)
], Groups.prototype, "admins", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Groups.prototype, "publicPosts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Groups.prototype, "inviteOnly", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [RecentSummaries_1.RecentSummaries]),
    (0, typeorm_1.ManyToMany)(() => RecentSummaries_1.RecentSummaries, (summary) => summary.pinnedGroups),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Groups.prototype, "pinnedSummaries", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [RecentSummaries_1.RecentSummaries]),
    (0, typeorm_1.ManyToMany)(() => RecentSummaries_1.RecentSummaries, (summary) => summary.groups),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Groups.prototype, "summaries", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Groups.prototype, "description", void 0);
Groups = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Groups);
exports.Groups = Groups;
//# sourceMappingURL=Groups.js.map
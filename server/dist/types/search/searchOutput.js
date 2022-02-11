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
exports.SearchOutput = void 0;
const RecentSummaries_1 = require("./../../entities/RecentSummaries");
const User_1 = require("./../../entities/User");
const Groups_1 = require("./../../entities/Groups");
const Bundle_1 = require("./../../entities/Bundle");
const type_graphql_1 = require("type-graphql");
let SearchOutput = class SearchOutput {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Bundle_1.Bundle]),
    __metadata("design:type", Array)
], SearchOutput.prototype, "bundles", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Groups_1.Groups]),
    __metadata("design:type", Array)
], SearchOutput.prototype, "groups", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.User]),
    __metadata("design:type", Array)
], SearchOutput.prototype, "users", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [RecentSummaries_1.RecentSummaries]),
    __metadata("design:type", Array)
], SearchOutput.prototype, "articles", void 0);
SearchOutput = __decorate([
    (0, type_graphql_1.ObjectType)()
], SearchOutput);
exports.SearchOutput = SearchOutput;
//# sourceMappingURL=searchOutput.js.map
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
exports.ParsedTextOutputObj = void 0;
const type_graphql_1 = require("type-graphql");
let ParsedTextOutputObj = class ParsedTextOutputObj {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ParsedTextOutputObj.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ParsedTextOutputObj.prototype, "interpreter", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ParsedTextOutputObj.prototype, "wordCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ParsedTextOutputObj.prototype, "title", void 0);
ParsedTextOutputObj = __decorate([
    (0, type_graphql_1.ObjectType)()
], ParsedTextOutputObj);
exports.ParsedTextOutputObj = ParsedTextOutputObj;
//# sourceMappingURL=ParsedTextOutputObj.js.map
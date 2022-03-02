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
exports.CreateGroupInput = void 0;
const type_graphql_1 = require("type-graphql");
let CreateGroupInput = class CreateGroupInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateGroupInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateGroupInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateGroupInput.prototype, "inviteOnly", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateGroupInput.prototype, "publicPosts", void 0);
CreateGroupInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateGroupInput);
exports.CreateGroupInput = CreateGroupInput;
//# sourceMappingURL=createGroupInput.js.map
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
exports.RegisterUserOutput = void 0;
const ErrorMessage_1 = require("./ErrorMessage");
const type_graphql_1 = require("type-graphql");
let RegisterUserOutput = class RegisterUserOutput {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], RegisterUserOutput.prototype, "registered", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ErrorMessage_1.ErrorMessage),
    __metadata("design:type", ErrorMessage_1.ErrorMessage)
], RegisterUserOutput.prototype, "error", void 0);
RegisterUserOutput = __decorate([
    (0, type_graphql_1.ObjectType)()
], RegisterUserOutput);
exports.RegisterUserOutput = RegisterUserOutput;
//# sourceMappingURL=registerUserOutput.js.map
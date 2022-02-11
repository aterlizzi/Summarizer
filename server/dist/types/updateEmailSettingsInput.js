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
exports.UpdateEmailSettingsInput = void 0;
const type_graphql_1 = require("type-graphql");
let UpdateEmailSettingsInput = class UpdateEmailSettingsInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateEmailSettingsInput.prototype, "news", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateEmailSettingsInput.prototype, "surveys", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateEmailSettingsInput.prototype, "business", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateEmailSettingsInput.prototype, "features", void 0);
UpdateEmailSettingsInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateEmailSettingsInput);
exports.UpdateEmailSettingsInput = UpdateEmailSettingsInput;
//# sourceMappingURL=updateEmailSettingsInput.js.map
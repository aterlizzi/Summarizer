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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedTextResolver = void 0;
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
let SelectedTextResolver = class SelectedTextResolver {
    changeSelectedText(email, sub, text) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(text);
            let user;
            if (email) {
                user = yield User_1.User.findOne({ where: { email } });
            }
            else if (sub) {
                user = yield User_1.User.findOne({ where: { googleSubKey: sub } });
            }
            if (!user)
                return false;
            user.highlightedText = text;
            yield user.save();
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email", { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("sub", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("text")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SelectedTextResolver.prototype, "changeSelectedText", null);
SelectedTextResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SelectedTextResolver);
exports.SelectedTextResolver = SelectedTextResolver;
//# sourceMappingURL=selectedText.js.map
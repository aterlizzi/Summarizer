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
exports.CreateBundleResolver = void 0;
const Bundle_1 = require("../../entities/Bundle");
const createBundleInput_1 = require("./../../types/bundle/createBundleInput");
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
let CreateBundleResolver = class CreateBundleResolver {
    createBundle(options, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["bundles"],
            });
            if (!user)
                return false;
            const newBundle = Bundle_1.Bundle.create({
                user,
                title: options.title,
                description: options.description ? options.description : "",
            });
            const bundles = user.bundles;
            bundles.push(newBundle);
            user.bundles = bundles;
            yield user.save();
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBundleInput_1.CreateBundleInput, Object]),
    __metadata("design:returntype", Promise)
], CreateBundleResolver.prototype, "createBundle", null);
CreateBundleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CreateBundleResolver);
exports.CreateBundleResolver = CreateBundleResolver;
//# sourceMappingURL=createBundle.js.map
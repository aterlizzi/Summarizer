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
exports.ReturnBundleResolver = void 0;
const Bundle_1 = require("../../entities/Bundle");
const isAuth_1 = require("./../../middlewares/isAuth");
const _ = require("lodash");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
let ReturnBundleResolver = class ReturnBundleResolver {
    returnBundles(sort, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            let sortedBundles;
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: [
                    "bundles",
                    "bundles.summaries",
                    "settings",
                    "settings.extensionSettings",
                ],
            });
            if (!user)
                return [];
            if (!sort) {
                sort = user.settings.extensionSettings.lastBundleSortType;
            }
            const bundles = user.bundles;
            switch (sort) {
                case "createdAt_desc":
                    sortedBundles = _.orderBy(bundles, "createdAt", "desc");
                    break;
                case "createdAt_asc":
                    sortedBundles = _.orderBy(bundles, "createdAt", "asc");
                    break;
                case "updatedAt_desc":
                    sortedBundles = _.orderBy(bundles, "updatedAt", "desc");
                    break;
                case "updatedAt_asc":
                    sortedBundles = _.orderBy(bundles, "updatedAt", "asc");
                    break;
                case "alphabetical_desc":
                    sortedBundles = _.orderBy(bundles, "title", "desc");
                    break;
                case "alphabetical_asc":
                    sortedBundles = _.orderBy(bundles, "title", "asc");
                    break;
                default:
                    sortedBundles = _.orderBy(bundles, "createdAt", "desc");
                    break;
            }
            user.settings.extensionSettings.lastBundleSortType = sort;
            yield user.save();
            return sortedBundles;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Bundle_1.Bundle]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("sort", { nullable: true })),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReturnBundleResolver.prototype, "returnBundles", null);
ReturnBundleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReturnBundleResolver);
exports.ReturnBundleResolver = ReturnBundleResolver;
//# sourceMappingURL=returnBundles.js.map
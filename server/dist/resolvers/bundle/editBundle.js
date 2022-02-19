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
exports.EditBundleResolver = void 0;
const editBundleInput_1 = require("./../../types/bundle/editBundleInput");
const RecentSummaries_1 = require("./../../entities/RecentSummaries");
const Bundle_1 = require("../../entities/Bundle");
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
let EditBundleResolver = class EditBundleResolver {
    addToBundle(bundleId, summaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield RecentSummaries_1.RecentSummaries.findOne({ where: { id: summaryId } });
            const bundle = yield Bundle_1.Bundle.findOne({
                where: { id: bundleId },
                relations: ["summaries"],
            });
            if (!bundle || !summary)
                return false;
            bundle.summaries.push(summary);
            yield bundle.save();
            return true;
        });
    }
    editBundle(bundleId, { payload }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const bundle = yield Bundle_1.Bundle.findOne({
                where: { id: bundleId },
                relations: ["user"],
            });
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (!bundle || !user)
                return false;
            if (bundle.user.id !== user.id)
                return false;
            if (options.description !== "") {
                bundle.description = options.description;
            }
            if (options.title !== "") {
                bundle.title = options.title;
            }
            yield bundle.save();
            return true;
        });
    }
    deleteBundle(bundleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Bundle_1.Bundle.delete(bundleId);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("bundleId")),
    __param(1, (0, type_graphql_1.Arg)("summaryId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EditBundleResolver.prototype, "addToBundle", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("bundleId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __param(2, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, editBundleInput_1.EditBundleInput]),
    __metadata("design:returntype", Promise)
], EditBundleResolver.prototype, "editBundle", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("bundleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EditBundleResolver.prototype, "deleteBundle", null);
EditBundleResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], EditBundleResolver);
exports.EditBundleResolver = EditBundleResolver;
//# sourceMappingURL=editBundle.js.map
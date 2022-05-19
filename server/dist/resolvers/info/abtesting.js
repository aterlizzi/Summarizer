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
exports.ABTestingResolver = void 0;
const isAdmin_1 = require("./../../middlewares/isAdmin");
const Info_1 = require("./../../entities/Info");
const type_graphql_1 = require("type-graphql");
let ABTestingResolver = class ABTestingResolver {
    updateABCount(type, medium) {
        return __awaiter(this, void 0, void 0, function* () {
            let info;
            console.log(type);
            try {
                switch (type) {
                    case "a":
                        info = yield Info_1.Info.findOne({ where: { type: medium } });
                        if (!info) {
                            info = Info_1.Info.create({ type: medium });
                            yield info.save();
                        }
                        info.a += 1;
                        yield info.save();
                        break;
                    case "b":
                        info = yield Info_1.Info.findOne({ where: { type: medium } });
                        if (!info) {
                            info = Info_1.Info.create({ type: medium });
                            yield info.save();
                        }
                        info.b += 1;
                        yield info.save();
                        break;
                    default:
                        break;
                }
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    returnABCount(medium) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield Info_1.Info.findOne({ where: { type: medium } });
            if (!info)
                return undefined;
            return info;
        });
    }
    deleteABCount(medium) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield Info_1.Info.findOne({ where: { type: medium } });
            if (!info)
                return false;
            yield Info_1.Info.delete(info.id);
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("type")),
    __param(1, (0, type_graphql_1.Arg)("medium")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ABTestingResolver.prototype, "updateABCount", null);
__decorate([
    (0, type_graphql_1.Query)(() => Info_1.Info, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)("medium")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ABTestingResolver.prototype, "returnABCount", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)("medium")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ABTestingResolver.prototype, "deleteABCount", null);
ABTestingResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ABTestingResolver);
exports.ABTestingResolver = ABTestingResolver;
//# sourceMappingURL=abtesting.js.map
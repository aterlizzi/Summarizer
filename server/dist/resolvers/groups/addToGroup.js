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
exports.CreateGroupResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const Groups_1 = require("../../entities/Groups");
let CreateGroupResolver = class CreateGroupResolver {
    addToGroup({ payload }, usernames, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            const group = yield Groups_1.Groups.findOne({ where: { id: groupId } });
            if (!user || !group)
                return false;
            try {
                const functionThatReturnsPromise = (username) => {
                    return User_1.User.findOne({ where: { username } });
                };
                const doSomethingAsync = (username) => __awaiter(this, void 0, void 0, function* () {
                    return functionThatReturnsPromise(username);
                });
                const getUsers = (usernames) => __awaiter(this, void 0, void 0, function* () {
                    return Promise.all(usernames.map((username) => doSomethingAsync(username)));
                });
                const data = yield getUsers(usernames);
                console.log(data);
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
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("usernames", () => [String])),
    __param(2, (0, type_graphql_1.Arg)("groupId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Number]),
    __metadata("design:returntype", Promise)
], CreateGroupResolver.prototype, "addToGroup", null);
CreateGroupResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CreateGroupResolver);
exports.CreateGroupResolver = CreateGroupResolver;
//# sourceMappingURL=addToGroup.js.map
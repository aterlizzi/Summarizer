"use strict";
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
exports.isAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entities/User");
const isAdmin = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorization = context.req.headers["authorization"];
    if (!authorization)
        throw new Error("Not authenticated.");
    try {
        const token = authorization.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_AT_SECRET_TOKEN);
        context.payload = payload;
        const user = yield User_1.User.findOne({ where: { id: (_a = context.payload) === null || _a === void 0 ? void 0 : _a.userId } });
        if (!user)
            throw new Error("Not authenticated.");
        if (!user.admin)
            throw new Error("Not admin.");
    }
    catch (err) {
        throw new Error("Not authenticated.");
    }
    return next();
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map
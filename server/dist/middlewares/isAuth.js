"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization)
        throw new Error("Not authenticated.");
    try {
        const token = authorization.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_AT_SECRET_TOKEN);
        context.payload = payload;
    }
    catch (err) {
        throw new Error("Not authenticated.");
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfLogged = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const checkIfLogged = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        const payload = undefined;
        context.payload = payload;
    }
    else {
        try {
            const token = authorization.split(" ")[1];
            const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_AT_SECRET_TOKEN);
            context.payload = payload;
        }
        catch (err) {
            throw new Error("Something went wrong.");
        }
    }
    return next();
};
exports.checkIfLogged = checkIfLogged;
//# sourceMappingURL=checkIfLogged.js.map
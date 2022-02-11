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
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entities/User");
const refreshTokenRoute = (fastify, _, next) => {
    fastify.post("/refresh_token", (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("attempted refresh");
        const token = req.cookies.jid;
        if (!token)
            return reply.send({ ok: false, accessToken: "" });
        let payload;
        try {
            payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_RT_SECRET_TOKEN);
        }
        catch (err) {
            return reply.send({ ok: false, accessToken: "" });
        }
        const user = yield User_1.User.findOne({ id: payload.userId });
        if (!user)
            return reply.send({ ok: false, accessToken: "" });
        reply.setCookie("jid", (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_RT_SECRET_TOKEN, {
            expiresIn: "7d",
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return reply.send({
            ok: true,
            accessToken: (0, jsonwebtoken_1.sign)({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN, {
                expiresIn: "15m",
            }),
        });
    }));
    next();
};
module.exports = refreshTokenRoute;
//# sourceMappingURL=refreshToken.js.map
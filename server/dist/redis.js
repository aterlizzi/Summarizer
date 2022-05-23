"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    port: 6379,
    host: "127.0.0.1",
    family: 4,
    db: 0,
    password: "RqEbRUjFuszBuELydR0Yln4tDEJWy0wvHnCYqKy7fWydndJi2jMYVsWyN/TuEO1cQBzHBeGK0x1hOBaGTg/95OvlhLzC0G09WZrmOmMTSK5OXrAYhPXJYalQX47L3zwmQpQGRQ",
});
//# sourceMappingURL=redis.js.map
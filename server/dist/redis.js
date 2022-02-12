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
    password: process.env.REDIS_PASS,
    db: 0,
});
//# sourceMappingURL=redis.js.map
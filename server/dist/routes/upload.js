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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const uuid_1 = require("uuid");
const storage = fastify_multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path_1.default.join(__dirname, "../uploads/"));
    },
    filename: (_, __, cb) => {
        cb(null, (0, uuid_1.v4)() + ".pdf");
    },
});
const upload = (0, fastify_multer_1.default)({ storage });
const uploadEndpoint = (fastify, _, next) => {
    fastify.register(require("fastify-multipart"));
    fastify.post("/upload", { preHandler: upload.single("file") }, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const filename = req.file.filename;
        const pathName = path_1.default.join(__dirname, `../uploads/${filename}`);
        const childPython = (0, child_process_1.spawn)("python3.9", [
            path_1.default.join(__dirname, "../uploads/pythonPDF.py"),
            pathName,
            filename,
        ]);
        const result = yield spawnProcess(childPython);
        try {
            fs_1.default.unlinkSync(pathName);
        }
        catch (err) { }
        reply.send({ result });
    }));
    next();
};
const spawnProcess = (childPython) => __awaiter(void 0, void 0, void 0, function* () {
    let id;
    const timeout = new Promise((resolve) => {
        id = setTimeout(() => {
            (0, process_1.kill)(childPython.pid);
            clearTimeout(id);
            console.log("killed");
            resolve("Ran out of allotted time to extract text from PDF.");
        }, 60000);
    });
    const promise = new Promise((resolve) => {
        childPython.stdout.on("data", (data) => {
            const finalData = data.toString();
            resolve(finalData);
        });
        childPython.stderr.on("data", (data) => {
            const finalData = data.toString();
            resolve(finalData);
        });
    });
    const result = yield Promise.race([promise, timeout]);
    clearTimeout(id);
    return result;
});
module.exports = uploadEndpoint;
//# sourceMappingURL=upload.js.map
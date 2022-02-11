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
const UserRelationship_1 = require("./entities/UserRelationship");
const Bundle_1 = require("./entities/Bundle");
const Groups_1 = require("./entities/Groups");
const ExtensionSettings_1 = require("./entities/ExtensionSettings");
const RecentSummaries_1 = require("./entities/RecentSummaries");
const CreditCard_1 = require("./entities/CreditCard");
const EmailSettings_1 = require("./entities/EmailSettings");
const Settings_1 = require("./entities/Settings");
const SavedSummary_1 = require("./entities/SavedSummary");
const User_1 = require("./entities/User");
const type_graphql_1 = require("type-graphql");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const fastify_cookie_1 = __importDefault(require("fastify-cookie"));
require("reflect-metadata");
dotenv_1.default.config();
const fastify = require("fastify");
const mercurius_1 = __importDefault(require("mercurius"));
const typeorm_1 = require("typeorm");
const stripeWebhook = require("./routes/stripe");
const uploadEndpoint = require("./routes/upload");
const refreshTokenRoute = require("./routes/refreshToken");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = fastify();
    yield (0, typeorm_1.createConnection)({
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.PGDBNAME,
        entities: [
            User_1.User,
            SavedSummary_1.SavedSummary,
            Settings_1.Settings,
            EmailSettings_1.EmailSettings,
            CreditCard_1.CreditCard,
            RecentSummaries_1.RecentSummaries,
            ExtensionSettings_1.ExtensionSettings,
            Groups_1.Groups,
            Bundle_1.Bundle,
            UserRelationship_1.UserRelationship,
        ],
        synchronize: true,
        logging: process.env.NODE_ENV !== "production",
    });
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [__dirname + "/resolvers/*/*.{ts,js}"],
        validate: true,
    });
    app.register(require("fastify-multipart"));
    app.register(fastify_cookie_1.default, {
        secret: process.env.COOKIE_SECRET,
    });
    app.register(require("fastify-express")).then(() => {
        app.use((0, cors_1.default)({
            credentials: true,
            origin: "http://localhost:3000",
        }));
    });
    app.register(mercurius_1.default, {
        schema,
        graphiql: true,
        context: (req, reply) => ({
            req,
            reply,
        }),
    });
    app.register(uploadEndpoint);
    app.register(stripeWebhook);
    app.register(refreshTokenRoute);
    app.listen(parseInt(process.env.PORT), () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map
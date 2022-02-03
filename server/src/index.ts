import { UserRelationship } from "./entities/UserRelationship";
import { Bundle } from "./entities/Bundle";
import { Groups } from "./entities/Groups";
import { ExtensionSettings } from "./entities/ExtensionSettings";
import { RecentSummaries } from "./entities/RecentSummaries";
import { CreditCard } from "./entities/CreditCard";
import { EmailSettings } from "./entities/EmailSettings";
import { Settings } from "./entities/Settings";
import { SavedSummary } from "./entities/SavedSummary";
import { MyContext } from "./types/MyContext";
import { Summary } from "./entities/Summary";
import { User } from "./entities/User";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "fastify-cookie";
import { FastifyCookieOptions } from "fastify-cookie";
import "reflect-metadata";
dotenv.config();

const fastify = require("fastify");
import mercurius from "mercurius";
import { createConnection } from "typeorm";
const stripeWebhook = require("./routes/stripe");
const uploadEndpoint = require("./routes/upload");
const refreshTokenRoute = require("./routes/refreshToken");

const main = async () => {
  const app = fastify();

  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: "summarizer",
    entities: [
      User,
      Summary,
      SavedSummary,
      Settings,
      EmailSettings,
      CreditCard,
      RecentSummaries,
      ExtensionSettings,
      Groups,
      Bundle,
      UserRelationship,
    ],
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
  });

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*/*.{ts,js}"],
    validate: true,
  });
  app.register(require("fastify-multipart"));
  app.register(cookie, {
    secret: process.env.COOKIE_SECRET,
  } as FastifyCookieOptions);
  app.register(require("fastify-express")).then(() => {
    app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    );
  });
  app.register(mercurius, {
    schema,
    graphiql: true,
    context: (req: MyContext, reply: MyContext) => ({
      req,
      reply,
    }),
  });
  app.register(uploadEndpoint);
  app.register(stripeWebhook);
  app.register(refreshTokenRoute);
  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
main().catch((err) => console.log(err));

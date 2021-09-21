import { MyContext } from "./types/MyContext";
import { Summary } from "./entities/Summary";
import { User } from "./entities/User";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

const fastify = require("fastify");
import mercurius from "mercurius";
import { createConnection } from "typeorm";

const main = async () => {
  const app = fastify();

  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: "summarizer",
    entities: [User, Summary],
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
  });
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*/*.{ts,js}"],
    validate: true,
  });

  app.register(mercurius, {
    schema,
    graphiql: true,
    context: (req: MyContext, reply: MyContext) => ({
      req,
      reply,
    }),
  });
  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
main().catch((err) => console.log(err));

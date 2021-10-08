import { SavedSummary } from "./entities/SavedSummary";
import { MyContext } from "./types/MyContext";
import { Summary } from "./entities/Summary";
import { User } from "./entities/User";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";
dotenv.config();

const fastify = require("fastify");
import mercurius from "mercurius";
import { createConnection } from "typeorm";
import multer from "fastify-multer";
import path from "path";
import { spawn } from "child_process";
import { v4 } from "uuid";
import fs from "fs";

const main = async () => {
  const app = fastify();

  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "./dist/uploads/");
    },
    filename: (_, __, cb) => {
      cb(null, v4() + ".pdf");
    },
  });

  const upload = multer({ storage });

  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PsASS,
    database: "summarizer",
    entities: [User, Summary, SavedSummary],
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
  });

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*/*.{ts,js}"],
    validate: true,
  });
  app.register(require("fastify-multipart"));
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
  app.post(
    "/upload",
    { preHandler: upload.single("file") },
    async (req: any, reply: any) => {
      const filename = req.file.filename;
      const pathName = path.join(__dirname, `./uploads/${filename}`);
      const childPython = spawn("python3", [
        path.join(__dirname, "./uploads/pythonPDF.py"),
        pathName,
        filename,
      ]);
      childPython.stdout.on("data", (data) => {
        const jsonString = data.toString();
        console.log(jsonString.length);
        if (jsonString.length < 3) {
          return console.log("error");
        } else {
          fs.unlinkSync(pathName);
          return console.log(jsonString);
        }
      });
      childPython.stderr.on("data", (data) => {
        return console.log(data.toString());
      });
      childPython.on("close", (code) => {
        return console.log(`closed on ${code}`);
      });
      reply.send({ hello: "world" });
    }
  );
  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
main().catch((err) => console.log(err));

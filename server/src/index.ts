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
import multer from "fastify-multer";
import path from "path";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { v4 } from "uuid";
import fs from "fs";
import kill from "tree-kill";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK;

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
      spawnProcess(childPython, pathName)
        .then((response) => {
          console.log(response);
          // fs.unlink(pathName, (err) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log(`Successfully deleted file at ${pathName}`);
          //   }
          // });
          reply.send({ text: response });
        })
        .catch((err) => console.log(err));
    }
  );
  app.post("/webhook", async (req: any, reply: any) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch {
      reply.status(400).send("Improper webhook signature.");
    }
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutId = event.data.object.id;
        let uid = event.data.object.client_reference_id;
        if (!uid) break;
        let user = await User.findOne({ where: { id: uid } });
        if (!user) break;
        const line_items = await stripe.checkout.session.listLineItems(
          checkoutId
        );
        const price_id = line_items.data[0].price.id;
        switch (price_id) {
          case process.env.STRIPE_PREM_PLAN_KEY:
            user.wordCount = 500000;
            user.prem = true;
            break;
          default:
            break;
        }
        user.custKey = event.data.object.customer;
        user.subKey = event.data.object.subscription;
        await user.save();
        break;
      case "customer.subscription.deleted":
        let custKey = event.data.object.customer;
        user = await User.findOne({ where: { custKey } });
        if (!user) break;
        user.prem = false;
        user.wordCount = 100000;
        await user.save();
        break;
      case "invoice.paid":
        custKey = event.data.object.customer;
        user = await User.findOne({ where: { custKey } });
        if (!user) break;
        if (user.prem) {
          user.wordCount = 500000;
        }
        await user.save();
        break;
      default:
        break;
    }
  });
  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
main().catch((err) => console.log(err));

const spawnProcess = (
  childPython: ChildProcessWithoutNullStreams,
  pathName: string
) => {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      kill(childPython.pid!);
      clearTimeout(id);
      console.log("killed");
      reject("Ran out of allotted time to extract text from PDF.");
    }, 10000);
  });
  const promise = new Promise((resolve) => {
    childPython.stdout.on("data", (data) => {
      const regex = new RegExp("^hi ");
      const finalData = data.toString();
      if (regex.test(finalData)) {
        console.log(finalData);
        resolve(finalData);
      }
    });
    childPython.stderr.on("data", (data) => {
      const finalData = data.toString();
      resolve(finalData);
    });
  });
  return Promise.race([promise, timeout]);
};

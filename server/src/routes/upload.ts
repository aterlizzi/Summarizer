import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import multer from "fastify-multer";
import fs from "fs";
import path from "path";
import { kill } from "process";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (_, __, cb) => {
    cb(null, v4() + ".pdf");
  },
});
const upload = multer({ storage });

const uploadEndpoint = (fastify: any, _: void, next: any) => {
  fastify.register(require("fastify-multipart"));

  fastify.post(
    "/upload",
    { preHandler: upload.single("file") },
    async (req: any, reply: any) => {
      const filename = req.file.filename;
      const pathName = path.join(__dirname, `../uploads/${filename}`);
      const childPython = spawn("python3.9", [
        path.join(__dirname, "../uploads/pythonPDF.py"),
        pathName,
        filename,
      ]);
      const result = await spawnProcess(childPython);
      try {
        fs.unlinkSync(pathName);
      } catch (err) {}
      reply.send({ result });
    }
  );
  next();
};

const spawnProcess = async (childPython: ChildProcessWithoutNullStreams) => {
  let id: any;
  const timeout = new Promise((resolve) => {
    id = setTimeout(() => {
      kill(childPython.pid!);
      clearTimeout(id);
      console.log("killed");
      resolve("Ran out of allotted time to extract text from PDF.");
    }, 10000);
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
  const result = await Promise.race([promise, timeout]);
  clearTimeout(id);
  return result;
};
module.exports = uploadEndpoint;

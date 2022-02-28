import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import multer from "fastify-multer";
import fs from "fs";
import path from "path";
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
    "/api/upload",
    { preHandler: upload.single("file") },
    async (req: any, reply: any) => {
      const filename = req.file.filename;
      const pathName = path.join(__dirname, `../uploads/${filename}`);
      const pythonType =
        process.env.NODE_ENV === "production" ? "python3" : "python3.9";
      const childPython = spawn(pythonType, [
        path.join(__dirname, "../uploads/pythonPDF.py"),
        pathName,
        filename,
      ]);
      const result = await spawnProcess(childPython);
      try {
        // delete the file
        fs.unlinkSync(pathName);
      } catch (err) {
        console.log(err);
      }
      reply.send({ result });
    }
  );
  next();
};

const spawnProcess = async (childPython: ChildProcessWithoutNullStreams) => {
  let id: any;

  // if the pdf isn't extracted in 60s, kill the process
  const timeout = new Promise((resolve) => {
    try {
      id = setTimeout(() => {
        // kill child process
        childPython.kill("SIGINT");
        clearTimeout(id);
        console.log("killed");
        resolve("Ran out of allotted time to extract text from PDF.");
      }, 60000);
    } catch (err) {
      console.log(err);
    }
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
  console.log(result);
  console.log("FUNCTION SUCCESSFULLY RETURNED");
  clearTimeout(id);
  return result;
};
module.exports = uploadEndpoint;

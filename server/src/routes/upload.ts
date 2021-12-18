import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import multer from "multer";
import path from "path";
import { kill } from "process";
import { v4 } from "uuid";

const uploadEndpoint = (fastify: any, _: void, next: any) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "../dist/uploads/");
    },
    filename: (_, __, cb) => {
      cb(null, v4() + ".pdf");
    },
  });

  const upload = multer({ storage });

  fastify.post(
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
  next();
};

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
module.exports = uploadEndpoint;

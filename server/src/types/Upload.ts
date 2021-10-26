import { Stream } from "stream";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export interface registerError {
  message: string;
  type: string;
}

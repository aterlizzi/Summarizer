import { Response } from "express";

export interface MyContext {
  req: Record<string, any>;
  reply: Response;
  redis: any;
}

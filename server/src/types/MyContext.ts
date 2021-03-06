import { FastifyRequest, FastifyReply } from "fastify";

export interface MyContext {
  req: FastifyRequest;
  reply: FastifyReply;
  payload?: { userId: string };
}

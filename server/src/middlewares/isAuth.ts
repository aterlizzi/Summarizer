import { MyContext } from "./../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) throw new Error("Not authenticated.");
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_AT_SECRET_TOKEN!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Not authenticated.");
  }
  return next();
};

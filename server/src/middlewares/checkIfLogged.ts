import { MyContext } from "./../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const checkIfLogged: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    const payload = undefined;
    context.payload = payload;
  } else {
    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.JWT_AT_SECRET_TOKEN!);
      context.payload = payload as any;
    } catch (err) {
      throw new Error("Something went wrong.");
    }
  }
  return next();
};

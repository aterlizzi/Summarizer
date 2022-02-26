import { MyContext } from "./../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { User } from "../entities/User";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) throw new Error("Not authenticated.");
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_AT_SECRET_TOKEN!);
    context.payload = payload as any;
    const user = await User.findOne({ where: { id: context.payload?.userId } });
    if (!user) throw new Error("Not authenticated.");
    if (!user.admin) throw new Error("Not admin.");
  } catch (err) {
    throw new Error("Not authenticated.");
  }
  return next();
};

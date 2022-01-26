import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "./../../types/MyContext";
import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() { reply }: MyContext): boolean {
    console.log("logged out");
    reply.clearCookie("jid", { path: "/" });
    return true;
  }
}

import { MyContext } from "./../../types/MyContext";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() ctx: MyContext): boolean {
    ctx.reply.clearCookie("jid", { path: "/" });
    return true;
  }
}

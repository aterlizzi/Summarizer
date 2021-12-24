import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
const OAuth = require("@zalando/oauth2-client-js");

@Resolver()
export class EvernoteResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async authEvernote(@Ctx() { payload }: MyContext): Promise<string> {
    // replace url when in production
  }
}

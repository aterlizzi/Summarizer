import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import axios from "axios";

@Resolver()
export class MendeleyResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async authMendeley(@Ctx() { payload }: MyContext): Promise<string> {
    // replace url when in production
    const url = `https://api.mendeley.com/oauth/authorize?client_id=${
      process.env.MENDELEY_CLIENT_ID
    }&redirect_uri=http:%2F%2Flocalhost:3000%2Fauth%2Fmendeley&response_type=code&scope=all&state=${
      Math.random() * 1000000000
    }`;
    return url;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async retrieveMendeleyToken(
    @Arg("code") code: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || user.settings.mendeleyConnected) return false;
    // create base64 encoded credentials for notion request.
    const credential = Buffer.from(
      process.env.MENDELEY_CLIENT_ID + ":" + process.env.MENDELEY_CLIENT_SECRET
    ).toString("base64");
    console.log(credential, code);
    const responseObject = await axios({
      headers: {
        Authorization: `Basic ${credential}`,
      },
      data: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/auth/mendeley",
      },
      url: "https://api.mendeley.com/oauth/token",
      method: "POST",
    });

    console.log(responseObject);
  }
}

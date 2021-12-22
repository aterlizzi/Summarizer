import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import querystring from "querystring";
import axios from "axios";
import { User } from "../../entities/User";

@Resolver()
export class GoogleResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async authGoogle(@Ctx() { payload }: MyContext): Promise<string> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || user.settings.googleConnected) return "";
    const rooturl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: "http://localhost:3000/auth/google",
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const url = `${rooturl}?${querystring.stringify(options)}`;
    console.log(url);
    return url;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async retrieveGoogleToken(
    @Arg("code") code: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || user.settings.googleConnected) return false;

    // constuct query string to get google access and refresh tokens.
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/auth/google",
      grant_type: "authorization_code",
    };
    const googleResponseData = await axios
      .post(url, querystring.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        throw new Error(error.message);
      });
    if (googleResponseData) {
      // retrieve user data from google
      const googleUserData = await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponseData.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleResponseData.refresh_token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          console.error(`Failed to fetch user`);
          throw new Error(error.message);
        });
      user.settings.googleMainEmail = googleUserData.email;
      user.settings.googleUserId = googleUserData.id;
      user.settings.googleAccessToken = googleResponseData.access_token;
      user.settings.googleRefreshToken = googleResponseData.refresh_token;
      user.settings.googleExpiresIn = googleResponseData.expires_in;
      user.settings.googleConnected = true;
    }
    await user.save();
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async clearGoogle(@Ctx() { payload }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    // if user isn't connected on google, dont make database changes.
    if (!user || !user.settings.googleConnected) return false;
    user.settings.googleMainEmail = "";
    user.settings.googleUserId = "";
    user.settings.googleAccessToken = "";
    user.settings.googleRefreshToken = "";
    user.settings.googleExpiresIn = undefined;
    user.settings.googleConnected = false;
    await user.save();
    return true;
  }
}

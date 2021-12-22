import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import axios from "axios";
import { User } from "../../entities/User";

@Resolver()
export class NotionResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async authNotion(@Ctx() { payload }: MyContext): Promise<string> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    // check if user already has an account. If they do, return a blank url.
    if (!user || user.settings.notionConnected) return "";
    // url to redirect the user and retrieve the code needed to get access token.
    const url = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${
      process.env.NOTION_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/auth/notion"
    )}&response_type=code`;
    return url;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async retrieveNotionToken(
    @Arg("code") code: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || user.settings.notionConnected) return false;

    // create base64 encoded credentials for notion request.
    const credential = Buffer.from(
      process.env.NOTION_CLIENT_ID + ":" + process.env.NOTION_CLIENT_SECRET
    ).toString("base64");

    // retrieve accesstoken from notion.
    const responseObject = await axios({
      headers: {
        Authorization: `Basic ${credential}`,
      },
      data: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/auth/notion",
      },
      url: "https://api.notion.com/v1/oauth/token",
      method: "POST",
    });
    const data = responseObject.data;

    // store notion info in database
    user.settings.notionAccessToken = data.access_token;
    user.settings.notionBotId = data.bot_id;
    user.settings.notionConnected = true;
    user.settings.notionUserId = data.owner.user.id;
    user.settings.notionWorkspaceIcon = data.workspace_icon;
    user.settings.notionWorkspaceId = data.workspace_id;
    user.settings.notionWorkspaceName = data.workspace_name;
    await user.save();
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async clearNotion(@Ctx() { payload }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    // if user isn't connected on notion, dont make database changes.
    if (!user || !user.settings.notionConnected) return false;
    user.settings.notionAccessToken = "";
    user.settings.notionBotId = "";
    user.settings.notionConnected = false;
    user.settings.notionUserId = "";
    user.settings.notionWorkspaceIcon = "";
    user.settings.notionWorkspaceId = "";
    user.settings.notionWorkspaceName = "";
    await user.save();
    return true;
  }
}

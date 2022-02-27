import { NotionPagesOutput } from "./../../types/notion/NotionPagesOutput";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import axios from "axios";
import { User } from "../../entities/User";
import { NotionDatabaseOutput } from "../../types/notion/NotionDatabaseOutput";
import { NotionCreatePageInput } from "../../types/notion/NotionCPInput";

const { Client } = require("@notionhq/client");

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

  @Mutation(() => Boolean)
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

  @Mutation(() => [NotionDatabaseOutput], { nullable: true })
  @UseMiddleware(isAuth)
  async retrieveNotionDatabases(
    @Ctx() { payload }: MyContext
  ): Promise<NotionDatabaseOutput[] | undefined> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    // check if user already has an account. If they do, return a blank url.
    if (!user || !user.settings.notionConnected) return undefined;
    const notion = new Client({ auth: user.settings.notionAccessToken });
    const response = await notion.databases.list();
    const databases = response.results;
    return databases.map((database: any) => ({
      title: database.title[0].text.content,
      id: database.id,
    }));
  }

  @Mutation(() => [NotionPagesOutput], { nullable: true })
  @UseMiddleware(isAuth)
  async retrieveNotionPages(
    @Ctx() { payload }: MyContext,
    @Arg("database") database: string
  ): Promise<NotionPagesOutput[] | undefined> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    // check if user already has an account. If they do, return a blank url.
    if (!user || !user.settings.notionConnected) return undefined;

    const notion = new Client({ auth: user.settings.notionAccessToken });
    const response = await notion.databases.query({
      database_id: database,
      page_size: 100,
    });
    const pages = response.results;
    console.log(pages[0].properties.Name.title[0].text.content);
    return pages.map((database: any) => ({
      title: database.properties.Name.title[0].text.content,
      id: database.id,
    }));
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createNotionPageSummary(
    @Ctx() { payload }: MyContext,
    @Arg("options") options: NotionCreatePageInput
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    // check if user already has an account. If they do, return a blank url.
    if (!user || !user.settings.notionConnected) return false;

    const parent = options.page
      ? { page_id: options.page }
      : { database_id: options.database };

    const summary = options.url
      ? { content: options.summary, link: { url: options.url } }
      : { content: options.summary };

    const notion = new Client({ auth: user.settings.notionAccessToken });
    const response = await notion.pages.create({
      parent: parent,
      icon: {
        type: "emoji",
        emoji: "🧠",
      },
      properties: {
        title: {
          id: "title",
          type: "title",
          title: [
            {
              text: {
                content: options.title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "heading_1",
          heading_1: {
            text: [
              {
                type: "text",
                text: {
                  content: "Summary",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            text: [
              {
                type: "text",
                text: {
                  content: `Created ${new Date().toDateString()}`,
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            text: [
              {
                type: "text",
                text: summary,
              },
            ],
          },
        },
      ],
    });
    console.log(response);
    return true;
  }
}

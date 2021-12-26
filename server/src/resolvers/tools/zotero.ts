import { ZoteroFindItemsOutput } from "./../../types/zotero/ZoteroFindItemsOutput";
import { CreateWPInput } from "./../../types/zotero/ZoteroCreateWPInput";
import { Collection } from "../../types/zotero/ZoteroCollectionsReturnObj";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { User } from "./../../entities/User";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import crypto from "crypto";
import axios from "axios";

const OAuth = require("oauth-1.0a");

@Resolver()
export class ZoteroResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async authZotero(@Ctx() { payload }: MyContext): Promise<string> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user) return "";
    if (user.settings.zoteroConnected) return "";
    let url;

    // create oauth client
    const oauth = OAuth({
      consumer: {
        key: process.env.ZOTERO_CLIENT_KEY,
        secret: process.env.ZOTERO_CLIENT_SECRET,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string: any, key: any) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    // bisection, if user hasn't done this process before, start anew.
    if (user.settings.zoteroRequestToken === "") {
      const tokenRequestConfig = {
        url: "https://www.zotero.org/oauth/request",
        method: "POST",
        data: {
          oauth_callback: "http://localhost:3000/auth/zotero",
        },
      };

      //   request a users request token and secret from zotero
      const tokenRequestResponse = await axios({
        url: "https://www.zotero.org/oauth/request",
        method: "POST",
        headers: oauth.toHeader(oauth.authorize(tokenRequestConfig)),
      });
      const tokenRequestData = tokenRequestResponse.data;
      const obj: any = {};

      //   parse the response from zotero
      tokenRequestData.replace(
        /([^=&]+)=([^&]*)/g,
        (_: void, key: any, value: any) => {
          obj[decodeURIComponent(key)] = decodeURIComponent(value);
        }
      );

      //   initialize the variables from the parsed response obj.
      const oAuthToken = obj["oauth_token"];
      const oAuthTokenSecret = obj["oauth_token_secret"];

      //   construct the url required for the access token
      url = `https://www.zotero.org/oauth/authorize?oauth_token=${oAuthToken}&library_access=1&notes_access=1&write_access=1&all_groups=write`;

      //   store user info in the database.
      user.settings.zoteroRequestSecret = oAuthTokenSecret;
      user.settings.zoteroRequestToken = oAuthToken;
      await user.save();

      //   if user has already done this process before and has the tokens, enter this else statement.
    } else {
      const oAuthToken = user.settings.zoteroRequestToken;
      url = `https://www.zotero.org/oauth/authorize?oauth_token=${oAuthToken}&library_access=1&notes_access=1&write_access=1&all_groups=write`;
    }
    return url;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async getAccessTokenZotero(
    @Arg("verifier") verifier: string,
    @Ctx()
    { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user) return false;

    // get the response token and secret from database.
    const oAuthToken = user.settings.zoteroRequestToken;
    const oAuthTokenSecret = user.settings.zoteroRequestSecret;

    // verifier is coming from params in the url.
    const oAuthVerifier = verifier;

    // intialize oauth client.
    const oauth = OAuth({
      consumer: {
        key: process.env.ZOTERO_CLIENT_KEY,
        secret: process.env.ZOTERO_CLIENT_SECRET,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string: any, key: any) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });
    const tokenExchangeConfig = {
      url: `https://www.zotero.org/oauth/access?oauth_token=${oAuthToken}`,
      method: "POST",
      data: {
        oauth_verifier: oAuthVerifier,
      },
    };

    // request access token from zotero.
    const tokenExchangeResponse = await axios({
      url: `https://www.zotero.org/oauth/access?oauth_token=${oAuthToken}`,
      headers: oauth.toHeader(
        oauth.authorize(tokenExchangeConfig, {
          public: oAuthToken,
          secret: oAuthTokenSecret,
        })
      ),
      method: "POST",
    });
    const tokenExchangeData = tokenExchangeResponse.data;

    // parse the response data.
    const userId = tokenExchangeData.match(/userID=([0-9]+)/)[1];
    const userAPIKey = tokenExchangeData.match(
      /oauth_token_secret=([a-zA-Z0-9]+)/
    )[1];
    console.log(typeof userId);

    // database changes -- important storage of zotero access key and user id.
    user.settings.zoteroUserId = userId;
    user.settings.zoteroAPIKey = userAPIKey;
    user.settings.zoteroRequestSecret = "";
    user.settings.zoteroRequestToken = "";
    user.settings.zoteroConnected = true;
    await user.save();

    // return true on success.
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async clearZotero(@Ctx() { payload }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || !user.settings.zoteroConnected) return false;
    user.settings.zoteroConnected = false;
    user.settings.zoteroAPIKey = "";
    user.settings.zoteroRequestSecret = "";
    user.settings.zoteroRequestToken = "";
    user.settings.zoteroUserId = "";
    await user.save();
    return true;
  }
  @Query(() => [Collection], { nullable: true })
  @UseMiddleware(isAuth)
  async returnZoteroCollections(
    @Ctx() { payload }: MyContext
  ): Promise<Collection[] | undefined> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || !user.settings.zoteroConnected) return undefined;
    const newTemplateResponse = await axios({
      headers: {
        Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
      },
      method: "GET",
      url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/collections`,
    });
    const collections = newTemplateResponse.data;
    return collections.map((collection: any) => ({
      collectionName: collection.data.name,
      collectionKey: collection.data.key,
    }));
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createNewWebPageZotero(
    @Ctx() { payload }: MyContext,
    @Arg("options") options: CreateWPInput
  ): Promise<boolean> {
    let attachedNoteResponse;
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || !user.settings.zoteroConnected) return false;
    const newTemplateResponse = await axios({
      method: "GET",
      url: "https://api.zotero.org/items/new?itemType=webpage",
    });
    const template = newTemplateResponse.data;
    template.collections = [options.collection];
    template.title = options.title;
    template.url = options.url;
    template.accessDate = new Date().toISOString;

    const newItemResponse = await axios({
      headers: {
        Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
      },
      method: "POST",
      url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/items`,
      data: [template],
    });
    if (newItemResponse.data.successful) {
      const itemKey = newItemResponse.data.successful["0"].key;
      const noteTemplate = {
        itemType: "note",
        note: options.summary,
        tags: [],
        parentItem: itemKey,
        relations: {},
      };
      attachedNoteResponse = await axios({
        headers: {
          Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
        },
        method: "POST",
        url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/items`,
        data: [noteTemplate],
      });
    }
    if (attachedNoteResponse?.data.successful) {
      return true;
    }
    return false;
  }

  @Query(() => [ZoteroFindItemsOutput], { nullable: true })
  @UseMiddleware(isAuth)
  async findZoteroItems(
    @Ctx() { payload }: MyContext,
    @Arg("collection") collection: string
  ): Promise<ZoteroFindItemsOutput[] | undefined> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || !user.settings.zoteroConnected) return undefined;
    const findItemsResponse = await axios({
      headers: {
        Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
      },
      method: "GET",
      url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/collections/${collection}/items`,
    });
    const items = findItemsResponse.data.filter((item: any) => {
      if (item.data.itemType === "note") return false;
      return true;
    });
    return items.map((item: any) => ({
      title: item.data.title,
      key: item.data.key,
      itemType: item.data.itemType,
    }));
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addNoteToItemZotero(
    @Ctx() { payload }: MyContext,
    @Arg("item") item: string,
    @Arg("summary") summary: string
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["settings"],
    });
    if (!user || !user.settings.zoteroConnected) return false;

    const noteTemplate = {
      itemType: "note",
      note: summary,
      tags: [],
      parentItem: item,
      relations: {},
    };
    const attachedNoteResponse = await axios({
      headers: {
        Authorization: `Bearer ${user.settings.zoteroAPIKey}`,
      },
      method: "POST",
      url: `https://api.zotero.org/users/${user.settings.zoteroUserId}/items`,
      data: [noteTemplate],
    });
    if (attachedNoteResponse.data.successful) {
      return true;
    }
    return false;
  }
}

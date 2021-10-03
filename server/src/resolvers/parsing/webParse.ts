import { ParsedTextOutputObj } from "./../../types/ParsedTextOutputObj";
import { Arg, Mutation, Resolver } from "type-graphql";
import Mercury from "@postlight/mercury-parser";

@Resolver()
export class WebParserResolver {
  @Mutation(() => ParsedTextOutputObj)
  async webParse(@Arg("url") url: string): Promise<ParsedTextOutputObj> {
    let text;
    let wordCount;
    const response = await Mercury.parse(url, { contentType: "text" });
    if (!response.content) {
      text = "";
      wordCount = 0;
    } else {
      text = response.content.replace(/\n/g, " ").replace(/\s(?=\s)/g, "");
      wordCount = text.split(" ").length;
    }
    const returnObj = {
      text,
      interpreter: "mercury",
      wordCount,
    };
    return returnObj;
  }
}

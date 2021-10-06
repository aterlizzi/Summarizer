import { Upload } from "./../../types/Upload";
import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";

@Resolver()
export class WebParserResolver {
  @Mutation(() => Boolean)
  async pdfParse(
    @Arg("file", () => GraphQLUpload) file: Upload
  ): Promise<boolean> {
    console.log(file);
    return true;
  }
}

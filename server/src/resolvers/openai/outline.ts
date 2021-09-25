import { User } from "../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

@Resolver()
export class OutlineResolver {
  @Mutation(() => String)
  async outline(
    @Arg("email", { nullable: true }) email: string,
    @Arg("sub", { nullable: true }) sub: string,
    @Arg("content") content: string
  ): Promise<string> {
    let user;
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (sub) {
      user = await User.findOne({ where: { googleSubKey: sub } });
    }
    if (!user) return "";
    return content;
  }
}

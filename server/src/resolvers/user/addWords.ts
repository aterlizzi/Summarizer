import { User } from "./../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class AddWordsResolver {
  @Mutation(() => User, { nullable: true })
  async addWords(
    @Arg("id") id: number,
    @Arg("wordCount") wordCount: number
  ): Promise<User | undefined> {
    const user = await User.findOne(id);
    if (!user) return undefined;
    user.wordCount = wordCount;
    return await user.save();
  }
}

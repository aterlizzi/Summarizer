import { Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class TotalWordsSummarized {
  @Query(() => Number)
  async totalWordsSummarized(): Promise<number> {
    const users = await User.find();
    const wordsSummarized = users.reduce(
      (prevVal, currentVal) => prevVal + currentVal.totalWordsSummarized,
      0
    );
    return wordsSummarized;
  }
}

import { Summary } from "./../../entities/Summary";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class ReturnSummariesResolver {
  @Query(() => [Summary], { nullable: true })
  async returnSummaries(): Promise<Summary[]> {
    const summaries = await Summary.find();
    return summaries;
  }
}

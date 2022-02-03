import { RecentSummaries } from "./../../entities/RecentSummaries";
import { User } from "./../../entities/User";
import { Groups } from "./../../entities/Groups";
import { Bundle } from "./../../entities/Bundle";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SearchOutput {
  @Field(() => [Bundle])
  bundles: Bundle[];

  @Field(() => [Groups])
  groups: Groups[];

  @Field(() => [User])
  users: User[];

  @Field(() => [RecentSummaries])
  articles: RecentSummaries[];
}

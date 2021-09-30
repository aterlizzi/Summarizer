import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SummaryReturnObj {
  @Field(() => String)
  summary: string;

  @Field(() => Number)
  remainingSummaries: number;
}

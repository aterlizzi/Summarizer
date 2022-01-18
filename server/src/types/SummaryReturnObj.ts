import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SummaryReturnObj {
  @Field(() => String)
  summary: string;

  @Field(() => Number)
  remainingSummaries: number;

  @Field(() => String)
  url: string;

  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => Boolean)
  popout: boolean;
}

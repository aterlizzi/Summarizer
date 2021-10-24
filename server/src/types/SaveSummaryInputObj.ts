import { Field, InputType } from "type-graphql";

@InputType()
export class SaveSummaryInputObj {
  @Field(() => String, { nullable: true })
  sub?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  url: string;
}

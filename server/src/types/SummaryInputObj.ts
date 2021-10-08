import { Field, InputType } from "type-graphql";

@InputType()
export class SummaryInputObj {
  @Field(() => String, { nullable: true })
  sub?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  url: string;
}

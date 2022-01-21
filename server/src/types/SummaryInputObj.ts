import { Field, InputType } from "type-graphql";

@InputType()
export class SummaryInputObj {
  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  url: string;
}

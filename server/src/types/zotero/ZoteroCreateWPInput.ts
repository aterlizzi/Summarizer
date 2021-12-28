import { Field, InputType } from "type-graphql";

@InputType()
export class CreateWPInput {
  @Field(() => String)
  collection: string;

  @Field(() => String)
  summary: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String)
  title: string;
}

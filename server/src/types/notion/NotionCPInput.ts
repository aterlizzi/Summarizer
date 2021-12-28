import { Field, InputType } from "type-graphql";

@InputType()
export class NotionCreatePageInput {
  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  database?: string;

  @Field(() => String, { nullable: true })
  page?: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  title: string;
}

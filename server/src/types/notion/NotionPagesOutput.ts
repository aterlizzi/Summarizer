import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class NotionPagesOutput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  id: string;
}

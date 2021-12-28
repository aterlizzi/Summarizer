import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class NotionDatabaseOutput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  id: string;
}

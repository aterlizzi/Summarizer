import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ZoteroFindItemsOutput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  itemType: string;
}

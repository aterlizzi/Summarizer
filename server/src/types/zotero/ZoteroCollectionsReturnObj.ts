import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Collection {
  @Field(() => String)
  collectionName: string;

  @Field(() => String)
  collectionKey: string;
}

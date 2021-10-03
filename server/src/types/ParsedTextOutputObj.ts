import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ParsedTextOutputObj {
  @Field(() => String)
  text: string;

  @Field(() => String)
  interpreter: string;

  @Field(() => Number)
  wordCount: number;
}

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorMessage {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}

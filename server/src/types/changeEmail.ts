import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ChangeEmailOutput {
  @Field(() => String)
  error: string;

  @Field(() => Boolean)
  success: boolean;
}

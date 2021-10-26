import { ErrorMessage } from "./ErrorMessage";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class RegisterUserOutput {
  @Field(() => Boolean)
  registered: boolean;

  @Field(() => ErrorMessage)
  error: ErrorMessage;
}

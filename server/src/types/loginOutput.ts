import { ErrorMessage } from "./ErrorMessage";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginOutput {
  @Field(() => Boolean)
  logged: boolean;

  @Field(() => ErrorMessage)
  error: ErrorMessage;
}

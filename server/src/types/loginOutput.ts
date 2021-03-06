import { ErrorMessage } from "./ErrorMessage";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginOutput {
  @Field(() => Boolean)
  logged: boolean;

  @Field(() => ErrorMessage)
  error: ErrorMessage;

  @Field(() => String)
  tier: string;

  @Field(() => Number)
  wordCount: number;

  @Field(() => String)
  accessToken: string;
}

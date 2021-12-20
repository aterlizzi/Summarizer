import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ConfirmUserOutput {
  @Field(() => String)
  accessToken: string;
}

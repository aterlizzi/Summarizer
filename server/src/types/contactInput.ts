import { Field, InputType } from "type-graphql";

@InputType()
export class ContactInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  text: string;
}

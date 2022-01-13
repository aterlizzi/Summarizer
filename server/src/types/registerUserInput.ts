import { User } from "./../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class registerUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  reason: string;

  @Field({ nullable: true })
  referral?: string;
}

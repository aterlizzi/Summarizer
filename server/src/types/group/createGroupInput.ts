import { User } from "./../../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateGroupInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  inviteOnly: boolean;

  @Field(() => Boolean)
  publicPosts: boolean;
}

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ReturnNotificationsObj {
  @Field(() => [String])
  friendRequests: string[];
}

import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateExtensionSettingsInput {
  @Field(() => Boolean)
  popout: boolean;

  @Field(() => Boolean)
  onlyFriendsCanView: boolean;

  @Field(() => Boolean)
  showSettings: boolean;

  @Field(() => Boolean)
  referFriendLink: boolean;
}

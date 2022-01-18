import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UpdateExtensionSettingsInput {
  @Field(() => Boolean)
  popout: boolean;

  @Field(() => Boolean)
  othersCanViewSummaries: boolean;
}

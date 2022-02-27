import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateEmailSettingsInput {
  @Field(() => Boolean)
  news: boolean;

  @Field(() => Boolean)
  surveys: boolean;

  @Field(() => Boolean)
  business: boolean;

  @Field(() => Boolean)
  features: boolean;
}

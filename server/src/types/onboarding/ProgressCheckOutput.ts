import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ProgressCheckOutput {
  @Field(() => Boolean)
  summarizedEntirePage: boolean;

  @Field(() => Boolean)
  summarizedHighlightedSectionPage: boolean;

  @Field(() => Boolean)
  summarizedFile: boolean;

  @Field(() => Boolean)
  summarizedManual: boolean;

  @Field(() => Boolean)
  summarizedPrivately: boolean;
}

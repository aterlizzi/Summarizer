import { Field, InputType } from "type-graphql";

@InputType()
export class EditBundleInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

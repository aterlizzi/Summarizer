import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBundleInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

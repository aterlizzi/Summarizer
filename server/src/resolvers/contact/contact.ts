import { ContactInput } from "./../../types/contactInput";
import { Arg, Mutation, Resolver } from "type-graphql";
import { sendContactMail } from "../../utils/emails/contactEmail";

@Resolver()
export class ContactResolver {
  @Mutation(() => Boolean)
  async contact(@Arg("options") options: ContactInput): Promise<boolean> {
    const name = options.firstName + " " + options.lastName;
    await sendContactMail(options.email, options.subject, options.text, name);
    return true;
  }
}

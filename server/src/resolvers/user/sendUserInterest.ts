import { Arg, Mutation, Resolver } from "type-graphql";
import { sendInterestEmail } from "../../utils/emails/interestEmail";

@Resolver()
export class SendUserInterestResolver {
  @Mutation(() => Boolean)
  async sendUserInterest(@Arg("email") email: string): Promise<boolean> {
    try {
      await sendInterestEmail(email);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

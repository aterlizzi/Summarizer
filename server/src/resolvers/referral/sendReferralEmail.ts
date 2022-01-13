import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { sendReferralInviteEmail } from "../../utils/emails/referralInviteEmail";

@Resolver()
export class SendReferralEmailResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendReferralEmail(
    @Arg("email") email: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return false;
    const referralCode = user.referralCode;
    await sendReferralInviteEmail(
      email,
      `http://localhost:3000/${referralCode}`
    );
    return true;
  }
}

import { ChangeEmailOutput } from "./../../types/changeEmail";
import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/isAuth";
import { sendChangeEmailMail } from "../../utils/emails/changeEmail";

@Resolver()
export class ChangeEmailResolver {
  @Mutation(() => ChangeEmailOutput)
  @UseMiddleware(isAuth)
  async changeEmail(
    @Ctx() { payload }: MyContext,
    @Arg("email") email: string
  ): Promise<ChangeEmailOutput> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    const possibleUser = await User.findOne({ where: { email } });
    if (!user) return { success: false, error: "Not authenticated." };
    if (possibleUser)
      return { success: false, error: "User with that email already exists." };
    const oldEmail = user.email;
    await sendChangeEmailMail(oldEmail, user.username ? user.username : "User");
    user.email = email;
    await user.save();
    return { success: true, error: "" };
  }
}

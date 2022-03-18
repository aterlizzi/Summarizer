import argon2 from "argon2";
import { redis } from "./../../redis";
import { ChangeEmailOutput } from "./../../types/changeEmail";
import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/isAuth";
import { changeEmailToken } from "../../constants/redisPrefixes";
import { v4 } from "uuid";
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
    user.tempChangeEmail = email;
    await user.save();
    const CODE = v4();
    await redis.set(changeEmailToken + CODE, user.id, "ex", 60 * 60 * 24);
    await sendChangeEmailMail(user.username!, email, CODE);
    return { success: true, error: "" };
  }
  @Mutation(() => Boolean)
  async confirmChangeEmail(
    @Arg("token") token: string,
    @Arg("password") password: string
  ): Promise<boolean> {
    // basic checks
    const userId = await redis.get(changeEmailToken + token);
    if (!userId) return false;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return false;

    // if password doesnt match back out.
    if (!(await argon2.verify(user.password!, password))) return false;

    // clear redis and update user.
    await redis.del(changeEmailToken + token);
    const newEmail = user.tempChangeEmail;
    user.tempChangeEmail = "";
    user.email = newEmail;
    await user.save();
    return true;
  }
}

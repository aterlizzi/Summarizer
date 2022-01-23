import { MyContext } from "./../../types/MyContext";
import argon2 from "argon2";
import { ConfirmUserOutput } from "./../../types/confirmUserOutput";
import { v4 } from "uuid";
import { redis } from "./../../redis";
import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { forgotPasswordToken } from "../../constants/redisPrefixes";
import { sendForgotPasswordEmail } from "../../utils/emails/forgotPasswordEmail";
import { sign } from "jsonwebtoken";

@Resolver()
export class PasswordResolver {
  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string): Promise<String> {
    const user = await User.findOne({ where: { email } });

    if (!user) return `Reset password email sent to ${email}`;
    const usersEmail = user.email;
    const token = v4();
    await redis.set(forgotPasswordToken + token, user.id, "ex", 60 * 60 * 24);
    sendForgotPasswordEmail(usersEmail, token);
    return `Reset password email sent to ${email}`;
  }
  @Mutation(() => String)
  async confirmForgotPassword(@Arg("token") token: string): Promise<string> {
    const userId = await redis.get(forgotPasswordToken + token);
    if (!userId) return "";
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return "";
    await redis.del(forgotPasswordToken + token);
    return userId;
  }

  @Mutation(() => ConfirmUserOutput)
  async changePassword(
    @Arg("password") password: string,
    @Arg("id") id: number,
    @Ctx() ctx: MyContext
  ): Promise<ConfirmUserOutput> {
    const user = await User.findOne({ where: { id } });
    if (!user) return { accessToken: "" };
    const hash = await argon2.hash(password);
    user.password = hash;
    await user.save();
    ctx.reply.setCookie(
      "jid",
      sign({ userId: user.id }, process.env.JWT_RT_SECRET_TOKEN!, {
        expiresIn: "7d",
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
        path: "/",
      }
    );
    return {
      accessToken: sign({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN!, {
        expiresIn: "15m",
      }),
    };
  }
}

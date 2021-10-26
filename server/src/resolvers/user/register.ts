import { registerUserInput } from "./../../types/registerUserInput";
import { MyContext } from "./../../types/MyContext";
import { registerUserToken } from "./../../constants/redisPrefixes";
import { redis } from "./../../redis";
import argon2 from "argon2";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { sendConfirmationMail } from "../../utils/emails/confirmUser";
import jwtDecode from "jwt-decode";
import { RegisterUserOutput } from "../../types/registerUserOutput";

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async registerGoogleUser(
    @Arg("token") token: string,
    @Arg("usecase") usecase: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const parsedToken: any = jwtDecode(token);
    console.log(parsedToken);
    if (parsedToken.iss !== "accounts.google.com") return true;
    const sub = parsedToken.sub;
    const user = await User.findOne({ where: { googleSubKey: sub } });
    const user2 = await User.findOne({ where: { email: parsedToken.email } });
    if (!user && !user2) {
      const email = parsedToken.email;
      const picture = parsedToken.picture;
      const name = parsedToken.name;
      const newUser = User.create({
        email,
        picture,
        username: name,
        googleSubKey: sub,
        accountType: "google",
        reason: usecase,
      });
      await newUser.save();
      ctx.reply.setCookie("uid", newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
        path: "/",
      });
      return true;
    } else {
      return false;
    }
  }
  @Mutation(() => RegisterUserOutput)
  async registerWebUser(
    @Arg("options") { email, password, reason }: registerUserInput
  ): Promise<RegisterUserOutput> {
    let user = await User.findOne({ where: { email } });
    if (user)
      return {
        registered: false,
        error: {
          type: "Email",
          message: "User with that email already exists.",
        },
      };
    if (password.length > 255 || password.length < 8)
      return {
        registered: false,
        error: {
          type: "Password",
          message:
            "Your password must be greater than 8 characters and less than 255.",
        },
      };
    const hash = await argon2.hash(password);
    user = User.create({
      email,
      password: hash,
      accountType: "web",
      reason,
    });
    const token = v4();
    await redis.set(registerUserToken + token, user.id, "ex", 60 * 60 * 24);
    await user.save();
    sendConfirmationMail(user.email, user.username!, registerUserToken + token);
    return { registered: true, error: {} };
  }
  @Query(() => User, { nullable: true })
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    const userId = await redis.get(registerUserToken + token);
    if (!userId) return undefined;
    const user = await User.findOne(userId);
    if (!user || user.confirmed) return undefined;
    user.confirmed = true;
    await user.save();
    await redis.del(registerUserToken + token);
    ctx.reply.setCookie("uid", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
      path: "/",
    });
    return user;
  }
}

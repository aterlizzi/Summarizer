import { LoginOutput } from "./../../types/loginOutput";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import jwtDecode from "jwt-decode";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Query(() => String)
  hello(): string {
    return "Hello world.";
  }
  @Mutation(() => Boolean)
  async verifyGoogleUser(
    @Arg("token") token: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const parsedToken: any = jwtDecode(token);
    const sub = parsedToken.sub;
    const user = await User.findOne({ where: { googleSubKey: sub } });
    if (!user) return false;
    ctx.reply.setCookie("uid", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
      path: "/",
    });
    return true;
  }
  @Mutation(() => LoginOutput)
  async verifyUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginOutput> {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return {
        logged: false,
        error: { message: "Either your email or password is incorrect." },
      };
    if (user.accountType !== "web")
      return {
        logged: false,
        error: { message: "Either your email or password is incorrect." },
      };
    if (!(await argon2.verify(user.password!, password)))
      return {
        logged: false,
        error: { message: "Either your email or password is incorrect." },
      };
    ctx.reply.setCookie("uid", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
      path: "/",
    });
    return { logged: true, error: {} };
  }
}

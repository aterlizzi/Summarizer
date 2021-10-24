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
  @Mutation(() => User, { nullable: true })
  async verifyUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } });
    if (!user) return undefined;
    if (user.accountType !== "web") return undefined;
    if (!(await argon2.verify(user.password!, password))) return undefined;
    return user;
  }
}

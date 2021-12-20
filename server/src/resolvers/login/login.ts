import { isAuth } from "./../../middlewares/isAuth";
import { LoginOutput } from "./../../types/loginOutput";
import { User } from "./../../entities/User";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import jwtDecode from "jwt-decode";
import { MyContext } from "../../types/MyContext";
import { sign } from "jsonwebtoken";

@Resolver()
export class LoginResolver {
  @Query(() => String)
  hello(): string {
    return "Hello world.";
  }
  @Mutation(() => LoginOutput)
  async verifyGoogleUser(
    @Arg("token", { nullable: true }) token: string,
    @Arg("sub", { nullable: true }) subKey: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginOutput> {
    let user;
    let sub;
    if (token) {
      const parsedToken: any = jwtDecode(token);
      sub = parsedToken.sub;
    }
    if (subKey) {
      sub = subKey;
    }
    user = await User.findOne({ where: { googleSubKey: sub } });
    if (!user) {
      return {
        logged: false,
        error: { message: "Either your email or password is incorrect." },
        tier: "",
        wordCount: 0,
        accessToken: "",
      };
    }
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
      logged: true,
      error: {},
      tier: user.paymentTier,
      wordCount: user.wordCount,
      accessToken: sign({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN!, {
        expiresIn: "15m",
      }),
    };
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
        tier: "",
        wordCount: 0,
        accessToken: "",
      };
    if (user.accountType !== "web")
      return {
        logged: false,
        error: { message: "Either your email or password is incorrect." },
        tier: "",
        wordCount: 0,
        accessToken: "",
      };
    if (!(await argon2.verify(user.password!, password)))
      return {
        logged: false,
        error: { message: "Either your email or password is incorrect." },
        tier: "",
        wordCount: 0,
        accessToken: "",
      };
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
      logged: true,
      error: {},
      tier: user.paymentTier,
      wordCount: user.wordCount,
      accessToken: sign({ userId: user.id }, process.env.JWT_AT_SECRET_TOKEN!, {
        expiresIn: "15m",
      }),
    };
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  clickMe(): string {
    return "hello";
  }
}

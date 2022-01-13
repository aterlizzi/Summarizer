import { EmailSettings } from "./../../entities/EmailSettings";
import { ConfirmUserOutput } from "./../../types/confirmUserOutput";
import { sign } from "jsonwebtoken";
import { registerUserInput } from "./../../types/registerUserInput";
import { MyContext } from "./../../types/MyContext";
import { registerUserToken } from "./../../constants/redisPrefixes";
import { redis } from "./../../redis";
import argon2 from "argon2";
import { User } from "./../../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { sendConfirmationMail } from "../../utils/emails/confirmUser";
import jwtDecode from "jwt-decode";
import { RegisterUserOutput } from "../../types/registerUserOutput";
import { Settings } from "../../entities/Settings";
const voucher_codes = require("voucher-code-generator");

@Resolver()
export class RegisterResolver {
  @Mutation(() => ConfirmUserOutput)
  async registerGoogleUser(
    @Arg("token") token: string,
    @Arg("usecase") usecase: string,
    @Arg("referral", { nullable: true }) referral: string,
    @Ctx() ctx: MyContext
  ): Promise<ConfirmUserOutput> {
    const parsedToken: any = jwtDecode(token);
    if (parsedToken.iss !== "accounts.google.com") return { accessToken: "" };
    const sub = parsedToken.sub;
    const user = await User.findOne({ where: { googleSubKey: sub } });
    const user2 = await User.findOne({ where: { email: parsedToken.email } });
    if (user || user2) return { accessToken: "" };
    const email = parsedToken.email;
    const picture = parsedToken.picture;
    const name = parsedToken.name;
    const newUser = User.create({
      email,
      picture,
      username: name,
      googleSubKey: sub,
      accountType: "google",
      reason: usecase ? usecase : "Personal",
    });
    console.log(newUser.id % 2 === 0);
    const userSettings = Settings.create({
      user: newUser,
      ABTest: newUser.id % 2 == 0 ? "A" : "B",
    });
    const userEmailSettings = EmailSettings.create({
      settings: userSettings,
    });
    userSettings.emailSettings = userEmailSettings;
    newUser.settings = userSettings;
    if (referral) {
      await handleReferralCode(referral, newUser);
    }
    await newUser.save();
    ctx.reply.setCookie(
      "jid",
      sign({ userId: newUser.id }, process.env.JWT_RT_SECRET_TOKEN!, {
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
      accessToken: sign(
        { userId: newUser.id },
        process.env.JWT_AT_SECRET_TOKEN!,
        {
          expiresIn: "15m",
        }
      ),
    };
  }
  @Mutation(() => RegisterUserOutput)
  async registerWebUser(
    @Arg("options") { email, password, reason, referral }: registerUserInput
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
      reason: reason ? reason : "Personal",
    });
    const userSettings = Settings.create({
      user,
      ABTest: user.id % 2 === 0 ? "A" : "B",
    });
    const userEmailSettings = EmailSettings.create({ settings: userSettings });
    userSettings.emailSettings = userEmailSettings;
    user.settings = userSettings;
    const code = await generateCode();
    user.referralCode = code;
    if (referral) {
      handleReferralCode(referral, user);
    }
    await user.save();
    await handleEmailSend(user);
    return {
      registered: true,
      error: {},
    };
  }
  @Mutation(() => Boolean)
  async resend(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    await handleEmailSend(user);
    return true;
  }
  @Mutation(() => ConfirmUserOutput)
  async confirmUser(
    @Arg("code") code: string,
    @Ctx() ctx: MyContext
  ): Promise<ConfirmUserOutput> {
    const userId = await redis.get(registerUserToken + code);
    if (!userId) return { accessToken: "" };
    const user = await User.findOne(userId);
    if (!user || user.confirmed) return { accessToken: "" };
    user.confirmed = true;
    await user.save();
    await redis.del(registerUserToken + code);
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

const handleEmailSend = async (user: User) => {
  const CODE = Math.floor(Math.random() * (9999 - 1000) + 1000);
  await redis.set(registerUserToken + CODE, user.id, "ex", 60 * 60 * 24);
  sendConfirmationMail(user.email, user.username!, CODE.toString());
};

const generateCode = async () => {
  const [code] = voucher_codes.generate({
    length: 8,
    count: 1,
  });
  const user = await User.findOne({ where: { referralCode: code } });
  if (user) {
    generateCode();
  } else {
    return code;
  }
};

const handleReferralCode = async (referral: string, user: User) => {
  const referralUser = await User.findOne({
    where: { referralCode: referral },
    relations: ["settings"],
  });
  if (!referralUser) return;
  referralUser.settings.totalRefers += 1;
  const totalRefers = referralUser.settings.totalRefers;
  if (totalRefers > 15) {
    referralUser.wordCount += 20000;
    user.settings.referralDiscount = 10;
  }
  if (totalRefers === 15) {
    referralUser.wordCount += 20000;
    user.settings.referralDiscount = 10;
    await handleFreePremium(referralUser);
  }
  if (totalRefers < 15 && totalRefers >= 10) {
    referralUser.wordCount += 15000;
    user.settings.referralDiscount = 10;
    referralUser.settings.referralDiscount = 15;
  }
  if (totalRefers < 10) {
    referralUser.wordCount += 10000;
    user.settings.referralDiscount = 10;
    referralUser.settings.referralDiscount = 10;
  }
  await referralUser.save();
  await user.save();
};

const handleFreePremium = async (user: User) => {
  user.prem = true;
  user.paymentTier = "Student";
  user.wordCount = 150000;
  user.current_period = Date.now();
  user.settings.freePrem = true;
};

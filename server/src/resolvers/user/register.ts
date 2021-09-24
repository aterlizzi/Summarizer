import { registerUserToken } from "./../../constants/redisPrefixes";
import { redis } from "./../../redis";
import argon2 from "argon2";
import { User } from "./../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { sendConfirmationMail } from "../../utils/emails/confirmUser";
import jwtDecode from "jwt-decode";
// import { OAuth2Client } from "google-auth-library";
// const client = new OAuth2Client(process.env.CLIENT_ID);

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async registerGoogleUser(@Arg("token") token: string): Promise<boolean> {
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
      });
      await newUser.save();
    }
    return true;
  }
  @Mutation(() => User, { nullable: true })
  async registerWebUser(
    @Arg("pass") pass: string,
    @Arg("email") email: string,
    @Arg("username") username: string
  ): Promise<User | undefined> {
    let user = await User.findOne({ where: { email } });
    if (user) return undefined;
    const hash = await argon2.hash(pass);
    user = User.create({
      email,
      username,
      password: hash,
      accountType: "web",
    });
    const token = v4();
    await redis.set(registerUserToken + token, user.id, "ex", 60 * 60 * 24);
    await user.save();
    await sendConfirmationMail(
      user.email,
      user.username!,
      registerUserToken + token
    );
    return user;
  }
  @Mutation(() => User, { nullable: true })
  async confirmUser(@Arg("token") token: string): Promise<User | undefined> {
    const userId = await redis.get(registerUserToken + token);
    if (!userId) return undefined;
    const user = await User.findOne(userId);
    if (!user || user.confirmed) return undefined;
    user.confirmed = true;
    await user.save();
    await redis.del(registerUserToken + token);
    return user;
  }
}

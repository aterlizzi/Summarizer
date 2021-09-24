import { User } from "./../../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import { OAuth2Client } from "google-auth-library";
import argon2 from "argon2";
// const client = new OAuth2Client(process.env.CLIENT_ID);

@Resolver()
export class LoginResolver {
  @Query(() => String)
  hello(): string {
    return "Hello world.";
  }
  @Mutation(() => User, { nullable: true })
  async verifyGoogleUser(@Arg("sub") sub: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { googleSubKey: sub } });
    if (!user) return undefined;
    return user;
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

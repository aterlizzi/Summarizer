import { User } from "./../../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID);

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async googleUser(): Promise<User> {}
  @Mutation(() => User)
  async webUser(): Promise<User> {}
}

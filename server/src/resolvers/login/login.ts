import { Query, Resolver } from "type-graphql";

@Resolver()
export class LoginResolver {
  @Query(() => String)
  hello(): string {
    return "Hello world.";
  }
}

import { isAdmin } from "./../../middlewares/isAdmin";
import { User } from "./../../entities/User";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class FindUsersAdminResolver {
  @Query(() => [User])
  @UseMiddleware(isAdmin)
  async findUsersAdmin(): Promise<User[]> {
    const users = await User.find({
      relations: [
        "settings",
        "settings.emailSettings",
        "recentSummaries",
        "settings.extensionSettings",
        "relationshipTwo",
        "relationshipOne",
        "relationshipTwo.userOne",
        "relationshipOne.userTwo",
      ],
    });
    return users;
  }
}

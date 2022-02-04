import { ReturnNotificationsObj } from "./../../types/notification/ReturnNotificationsObj";
import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "../../types/MyContext";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class ReturnNotificationResolver {
  @Query(() => ReturnNotificationsObj)
  @UseMiddleware(isAuth)
  async returnNotifications(
    @Ctx() { payload }: MyContext
  ): Promise<ReturnNotificationsObj> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["relationshipTwo", "relationshipTwo.userOne"],
    });
    if (!user) return { friendRequests: [] };
    const friendRequestsUnfiltered = user.relationshipTwo.filter(
      (relationship) => {
        if (relationship.type === "pending_friend_request") return true;
        return false;
      }
    );
    const friendRequestsFiltered = friendRequestsUnfiltered.map(
      (friendRequest) =>
        friendRequest.userOne.username ? friendRequest.userOne.username : ""
    );
    return { friendRequests: friendRequestsFiltered };
  }
}

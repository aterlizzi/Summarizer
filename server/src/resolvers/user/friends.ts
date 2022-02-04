import { MyContext } from "./../../types/MyContext";
import { UserRelationship } from "./../../entities/UserRelationship";
import { isAuth } from "./../../middlewares/isAuth";
import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class FriendResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendFriendRequest(
    @Arg("friendId") friendId: number,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["relationshipOne"],
    });
    const friend = await User.findOne({
      where: { id: friendId },
      relations: ["relationshipTwo"],
    });
    if (!user || !friend) return false;
    const userRelations = user.relationshipOne;
    const friendRelations = friend.relationshipTwo;
    const newRelationship = UserRelationship.create({
      userOne: user,
      userTwo: friend,
      type: "pending_friend_request",
    });
    user.relationshipOne = [...userRelations, newRelationship];
    friend.relationshipTwo = [...friendRelations, newRelationship];
    await user.save();
    await friend.save();
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg("username") username: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: ["relationshipTwo"],
    });
    const friend = await User.findOne({
      where: { username },
    });
    if (!user || !friend) return false;
    const relationship = await UserRelationship.findOne({
      where: { userOne: friend, userTwo: user },
    });
    if (!relationship) return false;
    relationship.type = "friends";
    await relationship.save();
    return true;
  }
}

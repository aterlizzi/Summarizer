import { MyContext } from "./../../types/MyContext";
import { UserRelationship } from "./../../entities/UserRelationship";
import { isAuth } from "./../../middlewares/isAuth";
import { User } from "../../entities/User";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

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
    });
    const friend = await User.findOne({
      where: { id: friendId },
    });
    if (!user || !friend) return false;
    const newRelationship = UserRelationship.create({
      userOne: user,
      userTwo: friend,
      type: "pending_friend_request",
    });
    await newRelationship.save();
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
      where: { userOne: friend, userTwo: user, type: "pending_friend_request" },
    });
    if (!relationship) return false;
    relationship.type = "friends";
    await relationship.save();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
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
      where: { userOne: friend, userTwo: user, type: "pending_friend_request" },
    });
    if (!relationship) return false;
    await UserRelationship.delete(relationship.id);
    return true;
  }
  @Query(() => [UserRelationship])
  async returnRelationships(): Promise<UserRelationship[]> {
    const relationships = await UserRelationship.find({
      relations: ["userOne", "userTwo"],
    });
    return relationships;
  }
  @Mutation(() => Boolean)
  async deleteRelationship(@Arg("id") id: number): Promise<boolean> {
    await UserRelationship.delete(id);
    return true;
  }
}

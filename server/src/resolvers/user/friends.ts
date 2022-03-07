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
    const currentRelationship = await UserRelationship.findOne({
      where: { userOne: user, userTwo: friend, type: "friends" },
    });
    if (currentRelationship) return false;
    const currentTwoRelationship = await UserRelationship.findOne({
      where: { userOne: friend, userTwo: user, type: "friends" },
    });
    if (currentTwoRelationship) return false;
    const pendingOneRelationship = await UserRelationship.findOne({
      where: { userOne: user, userTwo: friend, type: "pending_friend_request" },
    });
    if (pendingOneRelationship) return false;
    const pendingTwoRelationship = await UserRelationship.findOne({
      where: { userOne: friend, userTwo: user, type: "pending_friend_request" },
    });
    if (pendingTwoRelationship) return false;
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
  async sendAidanFriendRequest(
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({
      where: { id: payload!.userId },
    });
    const friend = await User.findOne({ where: { username: "Terlizzi" } });
    if (!user || !friend) return false;
    const newRelationship = UserRelationship.create({
      userOne: user,
      userTwo: friend,
      type: "friends",
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
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async returnFriendships(@Ctx() { payload }: MyContext): Promise<User[]> {
    const user = await User.findOne({
      where: { id: payload!.userId },
      relations: [
        "relationshipOne",
        "relationshipTwo",
        "relationshipOne.userTwo",
        "relationshipTwo.userOne",
      ],
    });
    if (!user) return [];
    // extract relationship one
    const relationOne = user.relationshipOne.filter(
      (relationship) => relationship.type === "friends"
    );
    // extract relationship two
    const relationTwo = user.relationshipTwo.filter(
      (relationship) => relationship.type === "friends"
    );
    // remap for only user type
    const friendOne = relationOne.map((friend) => friend.userTwo);
    const friendTwo = relationTwo.map((friend) => friend.userOne);

    return [...friendOne, ...friendTwo];
  }
  @Mutation(() => Boolean)
  async deleteRelationship(@Arg("id") id: number): Promise<boolean> {
    await UserRelationship.delete(id);
    return true;
  }
}

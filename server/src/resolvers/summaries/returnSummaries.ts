import { UserRelationship } from "./../../entities/UserRelationship";
import { isAuth } from "./../../middlewares/isAuth";
import { MyContext } from "./../../types/MyContext";
import { RecentSummaries } from "./../../entities/RecentSummaries";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";
const _ = require("lodash");

@Resolver()
export class ReturnSummariesResolver {
  @Query(() => [RecentSummaries], { nullable: true })
  async returnSummaries(): Promise<RecentSummaries[]> {
    const summaries = await RecentSummaries.find();
    return summaries;
  }
  @Query(() => [RecentSummaries])
  @UseMiddleware(isAuth)
  async returnUserSummaries(
    @Ctx() { payload }: MyContext
  ): Promise<RecentSummaries[]> {
    const user = await User.findOne({
      where: { id: payload!.userId },
    });
    if (!user) return [];
    const recentSummaries = RecentSummaries.find({
      relations: ["user"],
      where: { user },
      take: 5,
      order: { id: "DESC" },
    });
    return recentSummaries;
  }
  @Mutation(() => RecentSummaries, { nullable: true })
  @UseMiddleware(isAuth)
  async returnSummary(
    @Ctx() { payload }: MyContext,
    @Arg("id") id: number
  ): Promise<RecentSummaries | undefined> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return;
    const recentSummary = await RecentSummaries.findOne({
      where: { id },
      relations: [
        "user",
        "user.settings",
        "user.settings.extensionSettings",
        "user.relationshipOne",
        "user.relationshipTwo",
        "user.relationshipOne.userTwo",
        "user.relationshipTwo.userOne",
      ],
    });
    if (!recentSummary) return;

    // if the user doesn't allow users to view their summaries and the user viewing isnt the owner of the summary, return the user.
    if (
      recentSummary.user.settings.extensionSettings.onlyFriendsCanView &&
      recentSummary.user.id !== user.id
    ) {
      const friends = [
        ...recentSummary.user.relationshipOne,
        ...recentSummary.user.relationshipTwo,
      ];
      const filteredFriends = friends.filter((relationship) => {
        if (relationship.type !== "friends") return false;
        if (relationship.userOne && relationship.userOne.id !== user.id)
          return false;
        if (relationship.userTwo && relationship.userTwo.id !== user.id)
          return false;
        return true;
      });
      if (filteredFriends.length === 0) return;
    }
    return recentSummary;
  }
  @Query(() => [RecentSummaries])
  @UseMiddleware(isAuth)
  async returnFriendsRecentSummaries(
    @Ctx() { payload }: MyContext,
    @Arg("take") take: number
  ): Promise<RecentSummaries[]> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    if (!user) return [];
    const relationshipsOne = await UserRelationship.find({
      where: { userOne: user, type: "friends" },
      relations: [
        "userTwo",
        "userTwo.recentSummaries",
        "userTwo.recentSummaries.user",
      ],
    });
    const relationshipsTwo = await UserRelationship.find({
      where: { userTwo: user, type: "friends" },
      relations: [
        "userOne",
        "userOne.recentSummaries",
        "userOne.recentSummaries.user",
      ],
    });
    if (relationshipsOne.length === 0 && relationshipsTwo.length === 0)
      return [];

    const relationshipOneArr = relationshipsOne.map((relationship) => {
      return relationship.userTwo.recentSummaries;
    });
    const relationshipTwoArr = relationshipsTwo.map((relationship) => {
      return relationship.userOne.recentSummaries;
    });
    const relationships = [...relationshipOneArr, ...relationshipTwoArr].flat();
    const sortedRelationships = _.orderBy(relationships, "createdAt", "desc");

    // cut out any private summaries
    const resortedRelationships = sortedRelationships.filter(
      (summary: RecentSummaries) => {
        if (summary.private) return false;
        return true;
      }
    );
    resortedRelationships.length = take;
    return resortedRelationships;
  }
}

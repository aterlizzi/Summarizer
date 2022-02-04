import { Groups } from "./../../entities/Groups";
import { RecentSummaries } from "./../../entities/RecentSummaries";
import { Bundle } from "./../../entities/Bundle";
import { SearchOutput } from "./../../types/search/searchOutput";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { Like } from "typeorm";

@Resolver()
export class SearchResolver {
  @Mutation(() => SearchOutput)
  @UseMiddleware(isAuth)
  async search(
    @Arg("query") query: string,
    @Ctx() { payload }: MyContext
  ): Promise<SearchOutput> {
    const user = await User.findOne({ where: { id: payload!.userId } });
    console.log(query);
    if (!user || query === "" || query === " ")
      return {
        bundles: [],
        groups: [],
        users: [],
        articles: [],
      };
    const bundles = await Bundle.find({ where: { title: Like(`%${query}%`) } });
    const articles = await RecentSummaries.find({
      where: { title: Like(`%${query}%`) },
    });
    const tempUsers = await User.find({
      where: { username: Like(`%${query}%`) },
    });
    const groups = await Groups.find({ where: { name: Like(`%${query}%`) } });
    const users = tempUsers.filter((tempUser) => {
      if (user.id === tempUser.id) return false;
      return true;
    });
    return {
      bundles,
      articles,
      users,
      groups,
    };
  }
}

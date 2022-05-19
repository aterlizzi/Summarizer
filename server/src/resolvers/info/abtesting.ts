import { isAdmin } from "./../../middlewares/isAdmin";
import { Info } from "./../../entities/Info";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class ABTestingResolver {
  @Mutation(() => Boolean)
  async updateABCount(
    @Arg("type") type: string,
    @Arg("medium") medium: string
  ): Promise<boolean> {
    let info;
    console.log(type);
    try {
      switch (type) {
        case "a":
          info = await Info.findOne({ where: { type: medium } });
          if (!info) {
            // if there isn't an existing database entry for this, make one
            info = Info.create({ type: medium });
            await info.save();
          }
          info.a += 1; // update the parameter
          await info.save();
          break;
        case "b":
          info = await Info.findOne({ where: { type: medium } });
          if (!info) {
            info = Info.create({ type: medium });
            await info.save();
          }
          info.b += 1;
          await info.save();
          break;
        default:
          break;
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  @Query(() => Info, { nullable: true })
  @UseMiddleware(isAdmin)
  async returnABCount(
    @Arg("medium") medium: string
  ): Promise<Info | undefined> {
    const info = await Info.findOne({ where: { type: medium } });
    if (!info) return undefined;
    return info;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteABCount(@Arg("medium") medium: string): Promise<boolean> {
    const info = await Info.findOne({ where: { type: medium } });
    if (!info) return false;
    await Info.delete(info.id);
    return true;
  }
}

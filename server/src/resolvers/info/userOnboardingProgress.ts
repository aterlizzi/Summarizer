import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../../middlewares/isAuth";
import { ProgressCheckOutput } from "./../../types/onboarding/ProgressCheckOutput";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Onboarding } from "../../entities/Onboarding";

@Resolver()
export class UserOnboardingResolver {
  @Query(() => ProgressCheckOutput, { nullable: true })
  @UseMiddleware(isAuth)
  async userOnboardingProgress(
    @Ctx() { payload }: MyContext
  ): Promise<ProgressCheckOutput | undefined> {
    const onboarding = await Onboarding.findOne({
      relations: ["user"],
      where: { user: { id: payload!.userId } },
    });
    if (!onboarding) return undefined;
    return {
      summarizedEntirePage: onboarding.summarizedEntirePage,
      summarizedFile: onboarding.summarizedFile,
      summarizedHighlightedSectionPage:
        onboarding.summarizedHighlightedSectionPage,
      summarizedManual: onboarding.summarizedManual,
      summarizedPrivately: onboarding.summarizedPrivately,
    };
  }
}

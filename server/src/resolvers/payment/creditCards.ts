import { CreditCard } from "./../../entities/CreditCard";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CreditCardResolver {
  @Query(() => [CreditCard])
  async findCreditCards(): Promise<CreditCard[]> {
    const cards = await CreditCard.find();
    return cards;
  }
  @Mutation(() => Boolean)
  async deleteCreditCard(@Arg("id") id: number): Promise<boolean> {
    try {
      await CreditCard.delete(id);
      return true;
    } catch {
      return false;
    }
  }
}

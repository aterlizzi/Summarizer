import { User } from "./../entities/User";
import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { IsUserAlreadyExist } from "../resolvers/validators/isUserAlreadyExist";

@InputType()
export class registerUserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  @IsUserAlreadyExist({ message: "User with that email already exists." })
  @IsEmail(
    {},
    { message: "Your email is invalid, please enter a valid email." }
  )
  email: string;

  @Field()
  @Length(8, 255, { message: "Password must be 8 characters or more." })
  password: string;

  @Field()
  reason: string;
}

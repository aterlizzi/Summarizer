import { User } from "./User";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Onboarding extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.onboarding)
  user: User;

  @Field(() => Boolean)
  @Column({ default: false })
  summarizedEntirePage: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  summarizedHighlightedSectionPage: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  summarizedFile: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  summarizedManual: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  summarizedPrivately: boolean;
}

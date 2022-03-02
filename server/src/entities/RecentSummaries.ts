import { Groups } from "./Groups";
import { Bundle } from "./Bundle";
import { User } from "./User";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class RecentSummaries extends BaseEntity {
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
  @ManyToOne(() => User, (user) => user.recentSummaries, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  url?: string;

  @Field(() => String)
  @Column()
  summary: string;

  @Field(() => String)
  @Column({ default: "entire" })
  type: string;

  @Field(() => String)
  @Column({ default: "" })
  title: string;

  @Field(() => Number, { nullable: true })
  @Column("decimal", { default: null })
  rating: number;

  @Field(() => Number)
  @Column({ default: 0 })
  numberOfRatings: number;

  @Field(() => [Bundle])
  @ManyToMany(() => Bundle, (bundle) => bundle.summaries)
  bundles: Bundle[];

  @Field(() => [Groups])
  @ManyToMany(() => Groups, (group) => group.pinnedSummaries)
  pinnedGroups: Groups[];

  @Field(() => [Groups])
  @ManyToMany(() => Groups, (group) => group.summaries)
  groups: Groups[];

  @Field(() => Boolean)
  @Column({ default: false })
  private: boolean;
}

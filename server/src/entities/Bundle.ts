import { RecentSummaries } from "./RecentSummaries";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Bundle extends BaseEntity {
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
  @ManyToOne(() => User, (user) => user.bundles)
  user: User;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column({ default: "" })
  description: string;

  @Field(() => [RecentSummaries])
  @ManyToMany(() => RecentSummaries, (recentSummary) => recentSummary.bundles, {
    cascade: true,
  })
  @JoinTable()
  summaries: RecentSummaries[];
}

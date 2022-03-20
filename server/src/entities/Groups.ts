import { RecentSummaries } from "./RecentSummaries";
import { User } from "./User";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Groups extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups)
  users: User[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.adminGroups)
  admins: User[];

  @Field(() => Boolean)
  @Column({ default: false })
  publicPosts: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  inviteOnly: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  allowMemberToInvite: boolean;

  @Field(() => [RecentSummaries])
  @ManyToMany(() => RecentSummaries, (summary) => summary.pinnedGroups)
  @JoinTable()
  pinnedSummaries: RecentSummaries[];

  @Field(() => [RecentSummaries])
  @ManyToMany(() => RecentSummaries, (summary) => summary.groups)
  @JoinTable()
  summaries: RecentSummaries[];

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column({ default: "" })
  groupId: string;
}

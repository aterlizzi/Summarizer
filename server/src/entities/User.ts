import { Notification } from "./Notification";
import { UserRelationship } from "./UserRelationship";
import { Bundle } from "./Bundle";
import { Groups } from "./Groups";
import { RecentSummaries } from "./RecentSummaries";
import { Settings } from "./Settings";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SavedSummary } from "./SavedSummary";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Boolean)
  @Column({ default: false })
  admin: boolean;

  @Field(() => String)
  @Column()
  accountType: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column({ default: "" })
  tempChangeEmail: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  picture?: string;

  @Field(() => Boolean)
  @Column({ default: false })
  confirmed: boolean;

  @Field(() => String)
  @Column({ default: "Free" })
  paymentTier: string;

  @Field(() => Number)
  @Column({ default: 25000 })
  wordCount: number;

  @Field(() => String)
  @Column({ default: "" })
  reason: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  googleSubKey?: string;

  @Field(() => [SavedSummary])
  @OneToMany(() => SavedSummary, (summary) => summary.author, {
    cascade: true,
  })
  summaries: SavedSummary[];

  @Field(() => Boolean)
  @Column({ default: false })
  prem: boolean;

  @Field(() => Number)
  @Column({ default: Date.now(), type: "bigint" })
  current_period: number;

  @Field(() => String)
  @Column({ default: "" })
  custKey: string;

  @Field(() => String)
  @Column({ default: "" })
  subKey: string;

  @Field(() => Settings, { nullable: true })
  @OneToOne(() => Settings, {
    cascade: true,
    nullable: true,
    onDelete: "CASCADE",
  }) // cascade makes it such that I only need to save user to save settings, ondelete makes it so if a user is deleted, so are the settings.
  @JoinColumn()
  settings: Settings;

  @Field(() => Boolean)
  @Column({ default: false })
  freeTrialed: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  trialing: boolean;

  @Field(() => String)
  @Column({ default: "" })
  creditCardFingerprint: string;

  @Field(() => Boolean)
  @Column({ default: false })
  onboardCompleted: boolean;

  @Field(() => String)
  @Column({ default: "" })
  referralCode: string;

  @Field(() => [RecentSummaries])
  @OneToMany(() => RecentSummaries, (recentSummary) => recentSummary.user, {
    cascade: true,
  })
  recentSummaries: RecentSummaries[];

  @Field(() => [Groups])
  @ManyToMany(() => Groups, (group) => group.users, { cascade: true })
  @JoinTable()
  groups: Groups[];

  @Field(() => [Groups])
  @ManyToMany(() => Groups, (group) => group.admins, { cascade: true })
  @JoinTable()
  adminGroups: Groups[];

  @Field(() => [Bundle])
  @OneToMany(() => Bundle, (group) => group.user, { cascade: true })
  bundles: Bundle[];

  @Field(() => Number)
  @Column({ default: 0 })
  totalWordsSummarized: number;

  @Field(() => [UserRelationship])
  @OneToMany(() => UserRelationship, (relationship) => relationship.userOne)
  relationshipOne: UserRelationship[];

  @Field(() => [UserRelationship])
  @OneToMany(() => UserRelationship, (relationship) => relationship.userTwo)
  relationshipTwo: UserRelationship[];

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;

  @Field(() => [Notification])
  @OneToMany(() => Notification, (Notification) => Notification.user)
  notifications: Notification[];
}

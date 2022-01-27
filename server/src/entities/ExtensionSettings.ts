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
import { Settings } from "./Settings";

@ObjectType()
@Entity()
export class ExtensionSettings extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Settings)
  @OneToOne(() => Settings, (settings) => settings.extensionSettings, {
    onDelete: "CASCADE",
  })
  settings: Settings;

  @Field(() => Boolean)
  @Column({ default: true })
  onlyFriendsCanView: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  popoutSummary: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  autoPostEverySummary: boolean;

  @Field(() => String)
  @Column({ default: "" })
  defaultPostMessage: string;

  @Field(() => Boolean)
  @Column({ default: true })
  showSettingsLink: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  referFriendLink: boolean;

  @Field(() => String)
  @Column({ default: "" })
  lastBundleSortType: string;
}

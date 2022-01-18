import { EmailSettings } from "./EmailSettings";
import { User } from "./User";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ExtensionSettings } from "./ExtensionSettings";

@ObjectType()
@Entity()
export class Settings extends BaseEntity {
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
  @Column({ default: true })
  saveInDatabase: boolean;

  @Field(() => Number)
  @Column({ default: Date.now(), type: "bigint" })
  timeInStorage: number;

  @Field(() => User)
  @OneToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Field(() => String)
  @Column({ default: "" })
  zoteroAPIKey: string;

  @Field(() => String)
  @Column({ default: "" })
  zoteroUserId: string;

  @Field(() => String)
  @Column({ default: "" })
  zoteroRequestToken: string;

  @Field(() => String)
  @Column({ default: "" })
  zoteroRequestSecret: string;

  @Field(() => Boolean)
  @Column({ default: false })
  zoteroConnected: boolean;

  @Field(() => String)
  @Column({ default: "" })
  notionAccessToken: string;

  @Field(() => String)
  @Column({ default: "" })
  notionBotId: string;

  @Field(() => String)
  @Column({ default: "" })
  notionWorkspaceName: string;

  @Field(() => String)
  @Column({ default: "" })
  notionWorkspaceIcon: string;

  @Field(() => String)
  @Column({ default: "" })
  notionWorkspaceId: string;

  @Field(() => String)
  @Column({ default: "" })
  notionUserId: string;

  @Field(() => Boolean)
  @Column({ default: false })
  notionConnected: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  googleConnected: boolean;

  @Field(() => String)
  @Column({ default: "" })
  googleAccessToken: string;

  @Field(() => String)
  @Column({ default: "" })
  googleRefreshToken: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  googleExpiresIn?: number;

  @Field(() => String)
  @Column({ default: "" })
  googleUserId: string;

  @Field(() => String)
  @Column({ default: "" })
  googleMainEmail: string;

  @Field(() => Boolean)
  @Column({ default: false })
  evernoteConnected: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  mendeleyConnected: boolean;

  @Field(() => EmailSettings)
  @OneToOne(() => EmailSettings, (emailSettings) => emailSettings.settings, {
    onDelete: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  emailSettings: EmailSettings;

  @Field(() => ExtensionSettings, { nullable: true })
  @OneToOne(
    () => ExtensionSettings,
    (extensionSettings) => extensionSettings.settings,
    { onDelete: "CASCADE", cascade: true }
  )
  @JoinColumn()
  extensionSettings: ExtensionSettings;

  @Field(() => String)
  @Column({ nullable: true })
  ABTest: string;

  @Field(() => Number)
  @Column({ default: 0 })
  totalRefers: number;

  @Field(() => Number)
  @Column({ default: 0 })
  referralDiscount: number;

  @Field(() => Boolean)
  @Column({ default: false })
  freePrem: boolean;
}

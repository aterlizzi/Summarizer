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
  @OneToOne(() => User)
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
}

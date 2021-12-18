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

  @Field(() => String)
  @Column({ default: "" })
  zoteroApiKey: string;

  @Field(() => Number)
  @Column({ default: Date.now(), type: "bigint" })
  timeInStorage: number;

  @OneToOne(() => User)
  user: User;
}

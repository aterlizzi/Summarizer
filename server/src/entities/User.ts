import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Field(() => String)
  @Column()
  accountType: string;

  @Field(() => String)
  @Column()
  email: string;

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
  @Column({ default: 10000 })
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
}

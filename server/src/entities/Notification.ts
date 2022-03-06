import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
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
  type: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications, { cascade: true })
  user: User;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  groupId: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  groupMemberInviteStatus: string;
}

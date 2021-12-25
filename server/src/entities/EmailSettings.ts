import { Settings } from "./Settings";
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
export class EmailSettings extends BaseEntity {
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
  @OneToOne(() => Settings, { onDelete: "CASCADE" })
  settings: Settings;

  @Field(() => Boolean)
  @Column({ default: true })
  monthlyNews: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  improvementSurveys: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  businessEmails: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  featureReleases: boolean;
}

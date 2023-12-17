import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  pronouns: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  isPrivate: boolean;

  @Column({ nullable: true })
  instagram_username: string;

  @Column({ nullable: true })
  twitter_username: string;

  @Column({ nullable: true })
  pinterest_username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  bornDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

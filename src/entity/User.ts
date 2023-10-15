import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  DeleteDateColumn,
} from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ length: 50 })
  username: String;

  @PrimaryColumn()
  email: String;

  @Column()
  password: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

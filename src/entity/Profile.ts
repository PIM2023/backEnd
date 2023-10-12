import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  Double,
} from "typeorm";
import { User } from "./User";
import internal = require("stream");
  
@Entity()
export class Profile {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @PrimaryColumn({ length: 50 })
  username: String;

  @Column()
  photo: String;

  @Column()
  height: internal;

  @Column()
  weigth: Double;

  @Column()
  bornDate: Date;

	@CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
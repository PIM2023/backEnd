import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Followers {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación muchos a uno con User
  @ManyToOne(() => User, (user) => user.followers)
  user: User;

  // El id del usuario que sigue a otro usuario
  @Column()
  followerId: number;

  // El id del usuario que está siendo seguido por el followerId
  @Column()
  followingId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

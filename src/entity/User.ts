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
} from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";
import { Followers } from "./Followers";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ length: 50 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // Relación uno a muchos con Follower
  @OneToMany(() => Followers, (follower) => follower.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  followers: Followers[];
}

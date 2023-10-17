import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ length: 50 })
  username: String;

  @Column({ unique: true })
  email: String;

  @Column()
  password: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  profile: Profile;

  @ManyToOne(() => Post, (post) => post.user)
  posts: Post[];
}

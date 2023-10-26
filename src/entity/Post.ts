import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  text: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

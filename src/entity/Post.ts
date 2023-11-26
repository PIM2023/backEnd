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
import { Tag } from "./Tag";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  text: string;

  @Column({ type: "longblob", nullable: true })
  image: Buffer;

  @Column({ nullable: true, default: 0 })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Tag, (tags) => tags.post, { nullable: true })
  tags: Tag[];
}

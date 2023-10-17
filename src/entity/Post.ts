import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

// revisar import, solo lo he copiado de profile

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  cod_pub: Number;

  @Column({ nullable: true })
  text: String;

  @Column()
  image: String;

  @Column()
  likes: Number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  // faltaría Clave ajena de user no?
  // profile tmb dependiendo de cómo interpretemos el diagrama de clases
}

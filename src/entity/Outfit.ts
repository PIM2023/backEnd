import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Outfit {
  @PrimaryGeneratedColumn()
  id: number;

  /*
  @Column()
  hat: Product;

  @Column()
  head: Product;

  @Column()
  uppperBody: Product;

  @Column()
  lowerBody: Product;

  @Column()
  shoes: Product;*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

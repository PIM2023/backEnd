import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Gender } from "./Gender";
import { Brand } from "./Brand";
import { Color } from "./Color";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Gender, (gender) => gender.product)
  gender: Gender;

  @ManyToOne(() => Color, (color) => color.product)
  color: Color;

  @ManyToOne(() => Brand, (brand) => brand.product)
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

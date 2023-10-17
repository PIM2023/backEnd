import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  brandCode: Number;

  @Column()
  name: String;

  @OneToMany(() => Product, (product) => product.brand)
  product: Product[];
}

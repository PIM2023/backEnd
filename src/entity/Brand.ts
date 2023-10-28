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
  brandCode: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  product: Product[];
}

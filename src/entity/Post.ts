import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User";
  
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
  
    // faltaría Clave ajena de user no? 
    // profile tmb dependiendo de cómo interpretemos el diagrama de clases

    @OneToOne(() => User, (user) => user.profile)
    user: User;  // qué es esto
  }
  

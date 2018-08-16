import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
import User from "./User";
   @Entity()
   class Place extends BaseEntity {
    
    @PrimaryGeneratedColumn() id: number;
    
    @Column({ type: "varchar" })
    name: string;
    
    @Column({ type: "float", default: 0 })
    lat: number;
    
    @Column({ type: "float", default: 0 })
    lng: number;
    
    @Column({ type: "varchar" })
    address: string;
    
    @Column({ type: "tinyint", default: 0 })
    isFav: number; //즐겨찾기.

    //typeORM에서는 관계형으로 되어있는 (user)와 같은 데이터의 id를 데이터화 가능함.
    @Column({ nullable: true })
    userId: number;

    @ManyToOne(type => User, user => user.places)
    user: User;

    @CreateDateColumn() createdAt: string;
    
    @UpdateDateColumn() updatedAt: string;
  }
  export default Place;
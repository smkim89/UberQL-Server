import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from "typeorm";
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
    isFav: boolean;

    @CreateDateColumn() createdAt: string;
    
    @UpdateDateColumn() updatedAt: string;
  }
  export default Place;
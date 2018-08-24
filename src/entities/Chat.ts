import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from "typeorm";
import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    //Chat는 여러개의 message를 가지고 있다. 관계형 (1:N)
    @OneToMany(type => Message, message => message.chat, { nullable: true })
    messages: Message[];

    @Column({ nullable: true })
    passengerId: number;
    
    @ManyToOne(type => User, user => user.chatsAsPassenger)
    passenger: User;
    
    @Column({ nullable: true })
    driverId: number;
    
    @ManyToOne(type => User, user => user.chatsAsDriver)
    driver: User;
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Chat;
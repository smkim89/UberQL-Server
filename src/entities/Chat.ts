import {
    BaseEntity,
    CreateDateColumn,
    Entity,
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
    @OneToMany(type => Message, message => message.chat)
    messages: Message[];
    @OneToMany(type => User, user => user.chat)
    participants: User[];
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Chat;
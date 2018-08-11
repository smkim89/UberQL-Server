import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from "typeorm";
  
import Chat from "./Chat";
import User from "./User";
   
@Entity()
class Message extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: "varchar" })
    text: string;
    //Message는 chat의 메세지중 하나이다 관계형 (N:1)
    @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat;
    @ManyToOne(type => User, user => user.messages)
    user: User;
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
  
}
  
export default Message;
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from "typeorm";
import Message from "./Message";
import User from "./User";
import Ride from "./Ride";

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
    
    @Column({ nullable: true })
    rideId: number;
    
    @OneToOne(type => Ride, ride => ride.chat)
    ride: Ride;
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Chat;
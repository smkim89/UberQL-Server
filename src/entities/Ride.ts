import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { rideStatus } from "../types/types";

import User from "./User";
import Chat from "./Chat";

@Entity()
class Ride extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({
      type: "enum",
      enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
      default : "REQUESTING"

    })
    status: rideStatus;
    @Column({ type: "varchar" })
    pickUpAddress: string;
    @Column({ type: "float", default: 0 })
    pickUpLat: number;
    @Column({ type: "float", default: 0 })
    pickUpLng: number;
    @Column({ type: "varchar" })
    dropOffAddress: string;
    @Column({ type: "float", default: 0 })
    dropOffLat: number;
    @Column({ type: "float", default: 0 })
    dropOffLng: number;
    @Column({ type: "float", default: 0 })
    price: number;
    @Column({ type: "varchar" })
    distance: string;
    @Column({ type: "varchar" })
    duration: string;
    @Column({ nullable: true })
    passengerId: number;
    @ManyToOne(type => User, user => user.ridesAsPassenger)
    passenger: User;
    @Column({ nullable: true })
    driverId: number;
    @ManyToOne(type => User, user => user.ridesAsDriver)
    driver: User;
    
    @Column({ nullable: true })
    chatId: number;
    
    @OneToOne(type => Chat, chat => chat.ride, { nullable: true })
    @JoinColumn()
    chat: Chat;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}
export default Ride;
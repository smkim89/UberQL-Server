import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { rideStatus } from "../types/types";

import User from "./User";

@Entity()
class Ride extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({
      type: "enum",
      enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"]
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
    @ManyToOne(type => User, user => user.ridesAsPassenger)
    passenger: User;
    @ManyToOne(type => User, user => user.ridesAsDriver)
    driver: User;
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}
export default Ride;
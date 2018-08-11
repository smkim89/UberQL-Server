import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert
  } from "typeorm";

import { verificationTarget } from "../types/types";

const PHONE = "PHONE";
const EMAIL = "EMAIL";
import User from "./User";

@Entity()
class Verification extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "enum", enum: ["PHONE", "EMAIL"] })
    target: verificationTarget;
    
    @Column({ type: "varchar" })
    payload: string;
    
    @Column({ type: "varchar" })
    key: string;
    
    @Column({ type: "tinyint", default: 0 })
    used: boolean;
    
    @ManyToOne(type => User, user => user.verifications )
    user: User;

    @CreateDateColumn() createdAt: string;
    
    @UpdateDateColumn() updatedAt: string;

    @BeforeInsert()
    createKey(): void {
        if (this.target === PHONE) {
        this.key = Math.floor(Math.random() * 100000).toString();
        } else if (this.target === EMAIL) {
        this.key = Math.random()
            .toString(36)
            .substr(2);
        }
    }
  }
  export default Verification;
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
 @Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "varchar", unique: true })
  @IsEmail()
  email: string;
  @Column({ type: "tinyint", default: 0 })
  verifiedEmail: boolean;
  @Column({ type: "varchar" })
  firstName: string;
  @Column({ type: "varchar" })
  lastName: string;
  @Column({ type: "int" })
  age: number;
  @Column({ type: "varchar" })
  password: string;
  @Column({ type: "varchar" })
  phoneNumber: string;
  @Column({ type: "tinyint", default: 0 })
  verifiedPhonenNumber: boolean;
  @Column({ type: "varchar" })
  profilePhoto: string;
  @Column({ type: "tinyint", default: 0 })
  isDriving: boolean;
  @Column({ type: "tinyint", default: 0 })
  isRiding: boolean;
  @Column({ type: "tinyint", default: 0 })
  isTaken: boolean;
  @Column({ type: "float", default: 0 })
  lastLng: number;
  @Column({ type: "float", default: 0 })
  lastLat: number;
  @Column({ type: "float", default: 0 })
  lastOrientation: number;
   
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  @CreateDateColumn() createdAt: string;
  
  @UpdateDateColumn() updatedAt: string;
}
 export default User;
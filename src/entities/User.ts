import bcrypt, { hash } from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

const BCRYPT_ROUNDS = 10;

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
  
  //ascny를 사용했기때문에 Promise를 리턴해줌. type 이 promise고 리턴값이 없기에 void.

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
   private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  @CreateDateColumn() createdAt: string;
  
  @UpdateDateColumn() updatedAt: string;
}
 export default User;
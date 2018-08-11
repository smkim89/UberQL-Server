import bcrypt  from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

const BCRYPT_ROUNDS = 10;
import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Verification from "./Verification";

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
  @ManyToOne(type => Chat, chat => chat.participants)
  chat: Chat;
   @OneToMany(type => Message, message => message.user)
  messages: Message[];


  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }


  @BeforeInsert()
 
  //async 사용했기때문에 Promise를 리턴해줌. type 이 promise고 리턴값이 없기에 void.
  //this.hashPassword 가 promise를 리턴하기때문에 async await을 사용함.
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
  //bcrypt.hash 가 리턴하는데 시간이 걸림 someting.. then... then.. return Promise String으로 리턴한다.
   private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  @OneToMany(type => Verification, verification => verification.user)
  verifications: Verification[];
  @OneToMany(type => Ride, ride => ride.passenger)
  ridesAsPassenger: Ride[];
  @OneToMany(type => Ride, ride => ride.driver)
  ridesAsDriver: Ride[];

  @CreateDateColumn() createdAt: string;
  
  @UpdateDateColumn() updatedAt: string;
}
export default User;
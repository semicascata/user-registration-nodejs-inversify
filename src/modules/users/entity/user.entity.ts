import { injectable } from "inversify";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "timestamp" })
  birth: Date;

  @CreateDateColumn()
  createdAt: Date;
}

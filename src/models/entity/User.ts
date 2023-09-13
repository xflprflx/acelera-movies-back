import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "username", type: "varchar", unique: true, nullable: false })
  username: string

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string
}

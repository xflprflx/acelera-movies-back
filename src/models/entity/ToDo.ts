import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: String;

}
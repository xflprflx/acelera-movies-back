import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "title", type: "varchar" })
  title: string

  @Column({ name: "releaseDate", type: "timestamptz" })
  releaseDate: Date

  @Column({ name: "resume", type: "text" })
  resume: string

  @Column({ name: "note", type: "int" })
  note: number
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Actor } from "./Actor"

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "title", type: "varchar" })
  title: string

  @Column({ name: "gender", type: "varchar" })
  gender: string

  @Column({ name: "classification", type: "varchar" })
  classification: string

  @Column({ name: "subtitle", type: "varchar" })
  subtitle: string

  @Column({ name: "image", type: "text" })
  image: string

  @Column({ name: "releaseDate", type: "timestamptz" })
  releaseDate: Date

  @Column({ name: "director", type: "varchar" })
  director: string

  @Column({ name: "writer", type: "varchar" })
  writer: string

  @Column({ name: "studio", type: "varchar" })
  studio: string

  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable({
    name: "movie_actor",
    joinColumn: {
      name: "movie_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "actor_id",
      referencedColumnName: "id",
    },
  })
  actors: Actor[]

  @Column({ name: "resume", type: "text" })
  resume: string

  @Column({ name: "awards", type: "varchar" })
  awards: string

  @Column({ name: "note", type: "int" })
  note: number
}

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Movie } from "./Movie"

@Entity("actors")
export class Actor {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "name", type: "varchar" })
  name: string

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[]
}

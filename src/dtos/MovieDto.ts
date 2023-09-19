export class MovieDto {
  id: number
  title: string
  releaseDate: Date
  resume: string
  note: number

  constructor(
    id: number,
    title: string,
    releaseDate: Date,
    resume: string,
    note: number
  ) {
    this.id = id
    this.title = title
    this.releaseDate = releaseDate
    this.resume = resume
    this.note = note
  }
}

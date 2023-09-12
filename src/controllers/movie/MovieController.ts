import { Movie } from "@models/entity/Movie"
import { Request, Response } from "express"
import { getRepository } from "typeorm"

export class MovieController {
  async createMovie(req: Request, res: Response) {
    const { title, releaseDate, resume, note } = req.body
    if (!title) {
      return res.status(400).json({ message: "title é obrigatório" })
    }

    try {
      const movieRepository = getRepository(Movie)
      const newMovie = movieRepository.create({
        title,
        releaseDate,
        resume,
        note,
      })
      await movieRepository.save(newMovie)
      return res.status(201).json(newMovie)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async getMovies(req: Request, res: Response) {
    try {
      const movieRepository = getRepository(Movie)
      const movies = await movieRepository.find()
      return res.status(200).json(movies)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

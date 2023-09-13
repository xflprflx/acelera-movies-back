import { Actor } from "@models/entity/Actor"
import { Movie } from "@models/entity/Movie"
import { Request, Response } from "express"
import { getRepository } from "typeorm"

export class MovieController {
  async createMovie(req: Request, res: Response) {
    const {
      title,
      gender,
      classification,
      subtitle,
      image,
      releaseDate,
      director,
      writer,
      studio,
      actores,
      resume,
      awards,
      note,
    } = req.body
    if (
      !title ||
      !gender ||
      !classification ||
      !releaseDate ||
      !actores ||
      actores.length === 0
    ) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" })
    }

    try {
      const movieRepository = getRepository(Movie)
      const actorRepository = getRepository(Actor)
      const actorIds = actores
      const actorList = await actorRepository.findByIds(actorIds)
      const newMovie = movieRepository.create({
        title,
        gender,
        classification,
        subtitle,
        image,
        releaseDate,
        director,
        writer,
        studio,
        resume,
        awards,
        note,
      })
      newMovie.actores = actorList
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

  async getMovieById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const movieRepository = getRepository(Movie)
      const movie = await movieRepository.findOne(id, {
        relations: ["actores"],
      })
      if (!movie) {
        return res.status(404).json({ message: "Falha ao encontrar Filme." })
      }
      return res
        .status(200)
        .json({ message: "Filme encontrado com sucesso.", movie })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

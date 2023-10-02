import { Actor } from "@models/entity/Actor"
import { Movie } from "@models/entity/Movie"
import { Request, Response } from "express"
import { MovieDto } from "src/dtos/MovieDto"
import { getRepository } from "typeorm"

export class MovieController {
  async createMovie(req: Request, res: Response) {
    const {
      title,
      //gender,
      classification,
      subtitle,
      image,
      releaseDate,
      director,
      writer,
      studio,
      //actors,
      resume,
      //awards,
      note,
    } = req.body
    if (
      !title ||
      /*!gender ||*/
      !classification ||
      !releaseDate
    ) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" })
    }

    try {
      const movieRepository = getRepository(Movie)
      //const actorRepository = getRepository(Actor)
      //let actorList = []
      const newMovie = movieRepository.create({
        title,
        //gender,
        classification,
        subtitle,
        image,
        releaseDate,
        director,
        writer,
        studio,
        resume,
        //awards,
        note,
      })
      /*if(!actors){
       actorList = []
      }else {
        const actorIds = actors
        actorList = await actorRepository.findByIds(actorIds)
      }*/
      //newMovie.actors = actorList
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
      const movies = await movieRepository.find({
        select: ["id", "title", "image", "releaseDate", "resume", "note"], // Seleciona apenas os campos desejados
      })

      const movieDto: MovieDto[] = movies.map((movie) => {
        return new MovieDto(
          movie.id,
          movie.title,
          movie.image,
          movie.releaseDate,
          movie.resume,
          movie.note
        )
      })
      return res.status(200).json(movieDto)
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
        relations: ["actors"],
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

  async deleteMovieById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const movieRepository = getRepository(Movie)
      const movie = await movieRepository.findOne(id)

      if (!movie) {
        return res.status(404).json({ message: "Filme não encontrado." })
      }

      await movieRepository.remove(movie)

      return res
        .status(200)
        .json({ status: 200, message: "Filme excluído com sucesso." })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }

  async putMovieById(req: Request, res: Response) {
    const { id } = req.params
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
      actors,
      resume,
      awards,
      note,
    } = req.body

    try {
      const movieRepository = getRepository(Movie)
      const actorRepository = getRepository(Actor)

      const existingMovie = await movieRepository.findOne(id)

      if (!existingMovie) {
        return res.status(404).json({
          message: "não foi possível atualizar.",
          error: "filme não localizado",
        })
      }

      /*existingMovie.title = title || existingMovie.title;
      existingMovie.gender = gender || existingMovie.gender;
      existingMovie.classification = classification || existingMovie.classification;
      existingMovie.subtitle = subtitle || existingMovie.subtitle;
      existingMovie.image = image || existingMovie.image;
      existingMovie.releaseDate = releaseDate || existingMovie.releaseDate;
      existingMovie.director = director || existingMovie.director;
      existingMovie.writer = writer || existingMovie.writer;
      existingMovie.studio = studio || existingMovie.studio;
      existingMovie.resume = resume || existingMovie.resume;
      existingMovie.awards = awards || existingMovie.awards;
      existingMovie.note = note || existingMovie.note;*/

      if (Array.isArray(actors)) {
        const actorIds = actors
        const actorList = await actorRepository.findByIds(actorIds)
        if (actorList.length !== actorIds.length) {
          return res.status(400).json({
            message: "não foi possivel atualizar",
            error: "Um ou mais atores não foram encontrados.",
          })
        }
        existingMovie.actors = actorList
      }
      movieRepository.merge(existingMovie, req.body)
      await movieRepository.save(existingMovie)

      return res
        .status(200)
        .json({ message: "atualizado com sucesso", existingMovie })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }
}

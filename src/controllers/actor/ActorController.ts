import { Actor } from "./../../models/entity/Actor"
import { Request, Response } from "express"
import { getRepository } from "typeorm"

export class ActorController {
  async createActor(req: Request, res: Response) {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: "title é obrigatório" })
    }

    try {
      const actorRepository = getRepository(Actor)
      const newActor = actorRepository.create({
        name,
      })
      await actorRepository.save(newActor)
      return res.status(201).json(newActor)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async getActores(req: Request, res: Response) {
    try {
      const actorRepository = getRepository(Actor)
      const actores = await actorRepository.find()
      return res.status(200).json(actores)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

import { User } from "@models/entity/User"
import { Request, Response } from "express"
import { getRepository } from "typeorm"

export class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body
    if (!username) {
      return res.status(400).json({ message: "O username é obrigatório!" })
    }
    if (!password) {
      return res.status(400).json({ message: "O password é obrigatório!" })
    }

    try {
      const userRepository = getRepository(User)
      const newUser = userRepository.create({
        username,
        password,
      })
      await userRepository.save(newUser)
      return res.status(201).json(newUser)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User)
      const users = await userRepository.find()
      return res.status(200).json(users)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async getLogin(req: Request, res: Response) {
    const { username, password } = req.body
    try {
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({
        where: { username: username },
      })
      if (user.username != username || user.password != password) {
        return res.status(400).json({ auth: false, message: "falha" })
      }
      return res.status(200).json({ auth: true, message: "sucesso" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
}
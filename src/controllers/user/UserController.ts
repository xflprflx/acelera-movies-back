import { User } from "@models/entity/User"
import { Request, Response } from "express"
import { getRepository } from "typeorm"
import bcrypt from "bcrypt"

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
      // Gere um hash bcrypt para a senha
      const hashedPassword = await bcrypt.hash(password, 10) // 10 é o custo de processamento (quanto maior, mais seguro)

      const userRepository = getRepository(User)
      const newUser = userRepository.create({
        username,
        password: hashedPassword,
      })

      await userRepository.save(newUser)

      return res.status(201).json(newUser)
    } catch (error) {
      console.error(error)
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

  /*async getLogin(req: Request, res: Response) {
    const { username, password } = req.body
    try {
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({
        where: { username: username },
      })
      if (!user) {
        return res
          .status(404)
          .json({ auth: false, message: "Usuário não encontrado" })
      }
      if (user.username != username || user.password != password) {
        return res.status(401).json({ auth: false, message: "falha" })
      }
      return res.status(200).json({ auth: true, message: "sucesso" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }*/

  async getLogin(req: Request, res: Response) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res
        .status(401)
        .json({
          auth: false,
          message: "Credenciais de autenticação não fornecidas",
        })
    }

    const credentials = Buffer.from(
      authHeader.split(" ")[1],
      "base64"
    ).toString("utf-8")
    const [username, password] = credentials.split(":")

    try {
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({
        where: { username: username },
      })

      if (!user) {
        return res
          .status(404)
          .json({ auth: false, message: "Usuário não encontrado" })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      console.log("Username:", username)
      console.log("Password:", password)
      console.log("User Username:", user.username)
      console.log("User Password:", user.password)
      console.log("Password Match:", passwordMatch)

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ auth: false, message: "Credenciais inválidas" })
      }

      return res.status(200).json({ auth: true, message: "Sucesso" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

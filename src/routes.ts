import { getTODO, itsWorks } from "@controllers/todo"
import { MovieController } from "@controllers/movie/MovieController"
import { UserController } from "@controllers/user/UserController"
//import { Router } from "express";

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.get("/todo", getTODO)
  app.post("/movies", new MovieController().createMovie)
  app.get("/movies", new MovieController().getMovies)

  app.post("/users", new UserController().createUser)
  app.get("/users", new UserController().getUsers)
  app.get("/login", new UserController().getLogin)
}

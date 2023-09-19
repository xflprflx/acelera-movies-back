import { getTODO, itsWorks } from "@controllers/todo"
import { MovieController } from "@controllers/movie/MovieController"
import { UserController } from "@controllers/user/UserController"
import { ActorController } from "@controllers/actor/ActorController"
//import { Router } from "express";

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.get("/todo", getTODO)

  app.post("/movies", new MovieController().createMovie)
  app.get("/movies", new MovieController().getMovies)
  app.get("/movie/:id", new MovieController().getMovieById)
  app.delete("/movie/:id", new MovieController().deleteMovieById)
  app.put("/movie/:id", new MovieController().putMovieById)

  app.post("/users", new UserController().createUser)
  app.get("/users", new UserController().getUsers)
  app.get("/login", new UserController().getLogin)

  app.post("/actores", new ActorController().createActor)
  app.get("/actores", new ActorController().getActores)
}

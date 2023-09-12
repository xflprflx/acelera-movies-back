import { getTODO, itsWorks } from "@controllers/todo"
import { MovieController } from "@controllers/movie/MovieController"
//import { Router } from "express";

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.get("/todo", getTODO)
  app.post("/movies", new MovieController().createMovie)
  app.get("/movies", new MovieController().getMovies)
}

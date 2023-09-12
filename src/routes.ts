import { getTODO, itsWorks } from "@controllers/todo"

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.get("/todo", getTODO)
}

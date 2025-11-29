import express from "express";
import { categoriaController } from "../controllers/categoriaController.js";
import { isAdmin,isAuthenticated } from "../middleware/auth.js";

const routerCategoria = express.Router();

routerCategoria.post("/",isAdmin,categoriaController.crearCategoria);
routerCategoria.put("/:id",isAdmin,categoriaController.editarCategoria);
routerCategoria.delete("/:id",isAdmin,categoriaController.eliminarCategoria)
routerCategoria.get("/",categoriaController.listarCategoria)

export default routerCategoria;

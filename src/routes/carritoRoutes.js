import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import carritoCompraController from "../controllers/carritoCompraController.js";

const carritoRouter = express.Router();

carritoRouter.get("/vaciar",isAuthenticated,carritoCompraController.vaciarCarrito);
carritoRouter.post("/actualizar-item/:itemId",isAuthenticated, carritoCompraController.actualizarItem);
carritoRouter.post("/agregar-item",isAuthenticated, carritoCompraController.agregarItem);
carritoRouter.get("/",isAuthenticated, carritoCompraController.obtenerCarrito);
carritoRouter.delete("/eliminar-item/:itemId",isAuthenticated, carritoCompraController.eliminarItem);
export default carritoRouter;

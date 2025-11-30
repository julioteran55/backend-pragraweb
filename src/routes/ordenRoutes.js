import express from "express";
import OrdenController from "../controllers/ordenController.js";
import { isAuthenticated,isAdmin } from "../middleware/auth.js";

const ordenRouter = express.Router();

ordenRouter.post("/crear",isAuthenticated, OrdenController.crearOrden);
ordenRouter.get("/ordenes-por-usuario", isAuthenticated,OrdenController.obtenerOrdenes);
ordenRouter.get("/:ordenId", isAdmin,OrdenController.obtenerOrdenPorId);
ordenRouter.put("/:ordenId/direccion", isAuthenticated, OrdenController.actualizarDireccion);
ordenRouter.put("/:ordenId/pagar", isAuthenticated, OrdenController.confirmarPago);

export default ordenRouter;

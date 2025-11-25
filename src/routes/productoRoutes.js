import express from "express";
import productoController from "../controllers/productoController.js";

const router = express.Router();

router.post("/", productoController.createProducto);
router.get("/", productoController.getProductos);

export default router;

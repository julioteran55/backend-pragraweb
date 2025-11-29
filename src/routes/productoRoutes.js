import express from "express";
import productoController from "../controllers/productoController.js";
import { isAdmin,isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/",isAdmin,productoController.createProducto);
router.get("/",productoController.getProductos);
router.put("/:id",isAdmin, productoController.updateProductos);
router.delete("/:id",isAdmin, productoController.deleteProductos);
export default router;

import express from "express";
import ordenController from "../controllers/ordenController.js";

const router = express.Router();

router.post("/", ordenController.createOrden);
router.get("/", ordenController.getOrdenes);

export default router;

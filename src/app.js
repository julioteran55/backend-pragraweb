import express from "express";
import cors from "cors";

// Importar rutas

import productoRoutes from "./routes/productoRoutes.js";
import ordenRoutes from "./routes/ordenRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import routerCategoria from "./routes/categoriaRoutes.js";
const app = express();

app.use(
cors({
origin: process.env.FRONTEND_URL || "*",
})
);

app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/usuarios", userRouter);
app.use("/auth", authRouter);
app.use("/productos", productoRoutes);
app.use("/ordenes", ordenRoutes);
app.use("/categorias",routerCategoria)
export default app;


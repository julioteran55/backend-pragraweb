import express from "express";
import cors from "cors";

// Importar rutas
import userRoutes from "./routes/userRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import ordenRoutes from "./routes/ordenRoutes.js";

const app = express();

app.use(
cors({
origin: process.env.FRONTEND_URL || "*",
})
);

app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/usuarios", userRoutes);
app.use("/", userRoutes);
app.use("/productos", productoRoutes);
app.use("/ordenes", ordenRoutes);

export default app;


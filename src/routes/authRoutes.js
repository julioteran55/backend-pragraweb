import express from "express";
import { register, login, changePassword } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/change-password",isAuthenticated,changePassword)
export default authRouter;
import { Router } from "express";
import { login, logout, getUserInfo } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.get('/get-user-info', verifyToken, getUserInfo);

export default authRoutes;
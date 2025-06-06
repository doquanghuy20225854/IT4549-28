import { Router } from "express";
import { login } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post('/login', login);

// create 


export default authRoutes;
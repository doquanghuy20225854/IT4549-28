import { Router } from "express";
import { addPet, deletePet, getAllPets, getPetById } from "../controllers/PetControllers.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const petRoutes = Router();

// Thêm thú nuôi mới
petRoutes.post('/add-pet', verifyToken, addPet);

// Xóa thú nuôi
petRoutes.delete('/delete-pet/:id', verifyToken, deletePet);

// Lấy danh sách thú nuôi
petRoutes.get('/get-all-pets', verifyToken, getAllPets);

// Lấy thông tin một thú nuôi cụ thể
petRoutes.get('/get-pet-by-id/:id', verifyToken, getPetById);

export default petRoutes;


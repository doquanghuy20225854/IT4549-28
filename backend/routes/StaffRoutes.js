import express from 'express';
import { verifyToken, verifyStaff } from '../middleware/auth.js';
import {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
} from '../controllers/PetControllers.js';

const router = express.Router();

// Áp dụng middleware xác thực cho tất cả các routes
router.use(verifyToken);
router.use(verifyStaff);

// Routes cho quản lý thú cưng
router.get('/pets', getPets);
router.get('/pets/:id', getPetById);
router.post('/pets', createPet);
router.put('/pets/:id', updatePet);
router.delete('/pets/:id', deletePet);

export default router; 
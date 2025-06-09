import express from 'express';
import { getAllAppointments, addAppointment, updateAppointment, deleteAppointment } from '../controllers/AppointmentControllers.js';

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', addAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router; 

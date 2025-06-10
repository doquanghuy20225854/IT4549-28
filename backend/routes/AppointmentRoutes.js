import express from 'express';
import { 
  getAllAppointments, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment,
  addDoctorAppointment,
  addStaffAppointment,
  getStaffAppointments,
  getDoctorAppointments
} from '../controllers/AppointmentControllers.js';

const router = express.Router();

// General appointment routes
router.get('/', getAllAppointments);
router.post('/', addAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

// Doctor specific routes
router.post('/doctor', addDoctorAppointment);

// Staff specific routes
router.post('/staff', addStaffAppointment);

router.get('/staff', getStaffAppointments);
router.get('/doctor', getDoctorAppointments);

export default router; 

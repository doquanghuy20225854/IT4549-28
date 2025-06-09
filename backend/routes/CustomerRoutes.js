import express from 'express';
import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } from '../controllers/CustomerControllers.js';
import { verifyToken } from "../middlewares/AuthMiddlewares.js";
import { getCustomerAppointments } from '../controllers/AppointmentControllers.js';

const router = express.Router();

router.get('/', verifyToken, getAllCustomers);
router.post('/', verifyToken, addCustomer);
router.put('/:id', verifyToken, updateCustomer);
router.delete('/:id', verifyToken, deleteCustomer);
router.get('/:id/appointments', verifyToken, getCustomerAppointments);

export default router;
import { Router } from 'express';
import { createAppointment, listAppointments } from '../controllers/appointmentController.js';

const router = Router();

router.post('/', createAppointment);
router.get('/', listAppointments);

export default router;
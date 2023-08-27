import express from 'express'

const router = express.Router();

import { createAppointment, getAllPersonalAppointments, getAllAppointments, deleteAppointment } from '../controllers/appointmentController.js'
import authenticateUser from '../middleware/auth.js'




router.route('/personal-appointments').get(getAllPersonalAppointments)
router.route('/create-appointment').post(createAppointment)
router.route('/all-appointments').get(getAllAppointments)
router.route('/:id').delete(deleteAppointment)

export default router 
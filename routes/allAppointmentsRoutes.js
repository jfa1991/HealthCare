import express from 'express'

const router = express.Router();

import { getAllAppointments } from '../controllers/allAppointmentsController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/').get(getAllAppointments)


export default router 
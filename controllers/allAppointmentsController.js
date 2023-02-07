//import { StatusCodes } from  'http-status-codes'
import { 
	BadRequestError,
	NotFoundError,
	UnAuthenticatedError 
} from '../errors/index.js'

import hello from 'http-status-codes'
const { StatusCodes } = hello

import Appointment from '../models/AppointmentHealthCare.js'

import mongoose from 'mongoose'


const getAllAppointments = async(req,res) =>{

	const filter = {};
	
	const result = await Appointment.find({})

	const allAppointments = await result

	res.status(StatusCodes.OK).json({ allAppointments })
} 

export { getAllAppointments }
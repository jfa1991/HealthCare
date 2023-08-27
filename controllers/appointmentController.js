//import { StatusCodes } from  'http-status-codes'

import User from '../models/UserHealthCare.js'

import Appointment from '../models/AppointmentHealthCare.js'
import { 
	BadRequestError,
	NotFoundError,
	UnAuthenticatedError 
} from '../errors/index.js'

import hello from 'http-status-codes'
const { StatusCodes } = hello

import checkPermissions from '../utils/checkPermission.js'

import mongoose from 'mongoose'

import sendEmail from '../middleware/send-email.js'


const createAppointment =  async (req, res) => {

	const { dateAppointment,timeAppointment } = req.body

	const user = await User.findOne({ _id: req.user.userId })



	if(!dateAppointment|| !timeAppointment) {
		throw new BadRequestError('Please provide all values')
	}

	req.body.createdBy = req.user.userId

	const appointment = await Appointment.create(req.body)

	// Destructure properties from the appointment object with different variable names
    const { dateAppointment: appointmentDate, timeAppointment: appointmentTime } = appointment;

     await sendEmail(user, appointmentDate, appointmentTime);



	res.status(StatusCodes.CREATED).json({ appointment })
	
};

const getAllPersonalAppointments = async (req,res, next) => {
	const queryObject = {
		createdBy: req.user.userId
	}

	const result = Appointment.find(queryObject)

	const appointments = await result


	res.status(StatusCodes.OK).json({ appointments })


	
};

const getAllAppointments = async(req,res, next) =>{

	const filter = {};
	
	const result = await Appointment.find({})

	const allAppointments = await result

	res.status(StatusCodes.OK).json({ allAppointments })
} 

const deleteAppointment = async (req,res) => {
	const { id: appointmentId } = req.params

	const appointment = await Appointment.findOne({ _id: appointmentId })



	if(!appointment) {
		throw new NotFoundError(`No appointment with id:${appointmentId}`)
	}


	checkPermissions(req.user, appointment.createdBy)

	const { dateAppointment } = appointment

	const dateAppointmentInMiliSeconds = new Date(dateAppointment).getTime()

	const todayDate = new Date().getTime()

	if (dateAppointmentInMiliSeconds > todayDate) {
		await appointment.remove()

		res.status(StatusCodes.OK).json({ msg: 'Success! appointment removed'})

	} else {
		throw new BadRequestError('Can not delete appointment already happened')

	}





}




export { createAppointment, getAllPersonalAppointments, getAllAppointments, deleteAppointment }
import User from '../models/UserHealthCare.js'
//import { StatusCodes} from 'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js';

import hello from 'http-status-codes'
const { StatusCodes } = hello

const register = async (req,res, next) => {

	const {
		firstName, 
		email, 
		password, 
		lastName, 
		city, 
		zipCode,
		adress, 
	} = req.body

	if(!firstName || !email || !password || !lastName) {
		throw new BadRequestError('Please provide all values')
	}

	const userAlreadyExists = await User.findOne({ email })

	if (userAlreadyExists) {
		throw new BadRequestError('Email already in use')
	}

	const user = await User.create({ firstName, email, password, lastName, city, zipCode, adress })
	const token = user.createJWT()

	//res.status(StatusCodes.CREATED).json({ user, token })
	
	res.
		status(StatusCodes.CREATED)
		.json({ 
			user: {
				email: user.email, 
				firstName: user.firstName,
				lastName: user.lastName, 
				city: user.city, 
				adress: user.adress,
			}, 

			
			token })
			
}



const login =  async (req,res) => {
	const { email, password } = req.body
	if(!email || !password) {
		throw new BadRequestError('Please provide all values')
	}

	const user = await User.findOne({ email }).select('+password')
	
	if(!user) {
		throw new UnAuthenticatedError('Invalid credentials')
	}

	const isPasswordCorrect = await user.comparePassword(password)
	if(!isPasswordCorrect) {
		throw new UnAuthenticatedError('Invalid Credentials')
	}

	const token = user.createJWT()
	user.password = undefined

	res.status(StatusCodes.OK).json({ user, token })


}

const getInfoUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId })
	const token = user.createJWT()

	res.status(StatusCodes.OK).json({ user, token })

}

const updateUser = async (req,res) => {
	const { lastName,address, zipCode, city, email} = req.body
	if( !lastName || !email || !city || !address || !zipCode ) {
		throw new BadRequestError('Please provide all values')
	}

	const user = await User.findOne({ _id: req.user.userId } );

	user.lastName = lastName
	user.email = email
	user.city = city
	user.address = address
	user.zipCode = zipCode

	await user.save()

	const token = user.createJWT()

	res.status(StatusCodes.OK).json({ user, token })
}


export { register, login, updateUser, getInfoUser}
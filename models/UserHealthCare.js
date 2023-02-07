import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchemaHealthCare = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please provide your First Name'],
		trim: true,
	},

	lastName: {
		type: String,
		required: [true, 'Please provide your Last Name'],
		trim: true,
	},

	email: {
		type: String,
		required: [true, 'Please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},

	password:{
		type: String,
		required: [true, 'Please provide a valid password'],
		minLength: 6,
		select: false,
	},


	city: {
		type: String,
		trim: true,
			
	},

	zipCode: {
		type: Number,
		minLength: 4,
		maxLength: 4,
		trim: true,
	},

	address: {
		type: String,
		trim: true, 
	},
})


UserSchemaHealthCare.pre('save', async function () {

	if(!this.isModified('password'))return
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchemaHealthCare.methods.createJWT = function() {
	return jwt.sign({ userId : this._id }, process.env.JWT_SECRET, { 
		expiresIn: process.env.JWT_LIFETIME })
}

UserSchemaHealthCare.methods.comparePassword = async function(canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password)
	return isMatch

}


export default mongoose.model('UserHealthCare', UserSchemaHealthCare);
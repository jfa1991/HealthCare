import CustomAPIError from './custom-api.js'
//import { StatusCodes } from 'http-status-codes';


import hello from 'http-status-codes'
const { StatusCodes } = hello

class UnAuthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.UNAUTHORIZED // add property statusCode to Error instance
	}
}

export default UnAuthenticatedError
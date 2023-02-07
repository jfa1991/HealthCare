import CustomAPIError from './custom-api.js'
//import { StatusCodes } from 'http-status-codes'

import hello from 'http-status-codes'
const { StatusCodes } = hello

class NotFoundError extends CustomAPIError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.NOT_FOUND // add property statusCode to Error instance
	}
}

export default NotFoundError
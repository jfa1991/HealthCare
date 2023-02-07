import express from 'express'
const app = express ()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'




 // db

import connectDB from './db/connect.js'


// routers
import authRouter from './routes/authRoutes.js'
import appointmentRouter from './routes/appointmentRoutes.js'
import allAppointmentsRouter from './routes/allAppointmentsRoutes.js'

// middleware 

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'


if(process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Welcome')
})

app.use('/api/v2/auth', authRouter)
app.use('/api/v2/appointment', authenticateUser, appointmentRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)







const port = process.env.PORT || 5000


const start = async () => {
	try { 
		await connectDB(process.env.MONGO_URL)
		app.listen(port,() => {
			console.log(`Server is listening on ${port}...`)
		})
		 
	} catch  (error) {
		console.log(error)
	}
}

start()




import sgMail from '@sendgrid/mail'



const sendEmail = (user, appointmentDate, appointmentTime) => {


	const { email, firstName } = user

	// 1) Changing format Zulu Time to UTC 
	// 2) Make format looks like  "Monday 20 of August 2023"


	const formattedAppointmentDate = new Date(appointmentDate).toLocaleDateString('en-US', {
        	weekday: 'long',
        	year: 'numeric',
        	month: 'long',
        	day: 'numeric'
    	}).replace(/, /g, ' '); // Replace all occurrences of comma followed by space

	const appointmentBooked = `Hello ${firstName}, <br>
								Your appointment for ${formattedAppointmentDate} is booked. <br>
								See you soon ! <br>
								the Jinsei Team ! `
	

	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
		const msg = {
  			
  			to: email,
  			from: 'bimbumbam1991@gmail.com', // Change to your verified sender
  			subject: 'Sending with SendGrid is Fun',
  			text: 'and easy to do anywhere, even with Node.js',
  			html: appointmentBooked,
		}
		sgMail
  			.send(msg)
  			.then(() => {
    			console.log('Email sent')
  		})
  		.catch((error) => {
    		console.error(error)
 	 	})

 }

 export default sendEmail
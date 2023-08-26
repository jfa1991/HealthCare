import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarSmall, ContactFormRow, ContactFormTextArea,   } from '../components'
import { useAppContext } from '../context/appContext'

import emailjs from '@emailjs/browser';


import Wrapper from '../assets/wrappers/ContactPage'
import contact from '../assets/images/contact.svg'


const contactState = {
		firstName : '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	}

const Contact = () => {


	const { showSmallNavbar  } = useAppContext()

	const [valuesContact,setValuesContact] = useState(contactState)



		// Handle imput in form



	const handleChangeContactLastNameAndFirstNAme = (e) => {
  		const { name, value } = e.target;

  		// Validate the input using the regular expression
  		if (/^[\p{L}\s\-'\.\u00C0-\u02AF]*$/u.test(value) || value === "") {
    		setValuesContact({ ...valuesContact, [name]: value });
  		}
	};



	const handleChangeContactEmailAndMessage = (e) => {
		setValuesContact({...valuesContact, [e.target.name]: e.target.value })

	}

	const handleChangePhoneContact = (e) => {
  		const { name, value } = e.target;

  		// Validate the input using the regular expression
  		if (/^(\+)?[\d\s]*$/.test(value) || value === "") {
   		 	setValuesContact({ ...valuesContact, [name]: value });
  		}
	};




	// Functionnality to Receive Email from client


	const form = useRef();

	const sendEmail = (e) => {
    	e.preventDefault();
    	emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current, process.env.REACT_APP_YOUR_PUBLIC_KEY)
      		.then((result) => {
          		console.log(result.text);
      		}, (error) => {
          	console.log(error.text);
      	});

      	setValuesContact(contactState)
      	
  	};
 


  
	

	return(
		<Wrapper>
			{!showSmallNavbar ? <Navbar /> : <NavbarSmall />}

			
			<div className = 'container container-form'>
				<div className = 'infos-picture'>
					<div className = 'contact-infos'>
						<span className = 'title'>Any Question or Appointment to Book?</span>
						<span>+91 322 82 12 </span>
		 				<span>info@jinsey.com</span>
						<span>Via del Congresso 12</span>
		  				<span>6924 Lugano</span> 
					</div>
					<img src = {contact} alt= 'picture-contact' className= 'img'/>
				</div>

				<form className = 'form' ref={form} onSubmit ={sendEmail}>
					
					<ContactFormRow
						type ='text'
						value = {valuesContact.firstName}
						name = 'firstName'
						handleChange= {handleChangeContactLastNameAndFirstNAme}
						labelText ='First Name'

					/>

					<ContactFormRow
						type='text'
						value = {valuesContact.lastName}
						name ='lastName'
						handleChange ={handleChangeContactLastNameAndFirstNAme}
						labelText ='Last Name'
					/>

					<ContactFormRow
						type ='email'
						value = {valuesContact.email}
						name='email'
						handleChange = {handleChangeContactEmailAndMessage}
					/>

					<ContactFormRow
						type ='text'
						value = {valuesContact.phone}
						name ='phone'
						handleChange = {handleChangePhoneContact}
					/>




					<ContactFormTextArea
						type ='text'
						value={valuesContact.message}
						name='message'
						handleChange={handleChangeContactEmailAndMessage}
					/>


					<button type ='submit' className = 'btn '>Submit</button>


				</form>

				{/*<Link to ='/register' className ='btn btn-book-online'>Book Your Appointment Online</Link> */}




  

		
			</div>

		</Wrapper>

	)
}

export default Contact


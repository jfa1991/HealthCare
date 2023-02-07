import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarSmall, ContactFormRow, ContactFormTextArea  } from '../components'
import { useAppContext } from '../context/appContext'


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


	const handleChangeContact = (e) => {
		setValuesContact({...valuesContact, [e.target.name]: e.target.value })

	}

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

				<form className = 'form'>
					<ContactFormRow
						type ='text'
						value = {valuesContact.firstName}
						name = 'firstName'
						handleChange= {handleChangeContact}
						labelText ='First Name'
					/>

					<ContactFormRow
						type='text'
						value = {valuesContact.lastName}
						name ='lastName'
						handleChange ={handleChangeContact}
						labelText ='Last Name'
					/>

					<ContactFormRow
						type ='email'
						value = {valuesContact.email}
						name='email'
						handleChange = {handleChangeContact}
					/>

					<ContactFormRow
						type ='number'
						value = {valuesContact.phone}
						name ='phone'
						handleChange = {handleChangeContact}
					/>




					<ContactFormTextArea
						type ='text'
						value={valuesContact.message}
						name='message'
						handleChange={handleChangeContact}
					/>


					<button className = 'btn '>Submit</button>


				</form>

				{/*<Link to ='/register' className ='btn btn-book-online'>Book Your Appointment Online</Link> */}



		
			</div>

		</Wrapper>

	)
}

export default Contact


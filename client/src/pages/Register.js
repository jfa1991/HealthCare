import React, { useState, useEffect } from 'react'
import { Alert, FormRow, Logo, Navbar, NavbarSmall } from '../components/'

import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const initialState = {
	firstName:'',
	lastName:'',
	email:'',
	password:'',
	city:'',
	zipCode:'',
	address:'',
	isMember:true,

}

const Register = () => {

	const [values,setValues] = useState(initialState)

	const navigate = useNavigate()

	const {
		user,
		isLoading,
		showAlert,
		displayAlert,
		setupUser,
		showSmallNavbar,
		
	} = useAppContext()


	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value })

	}

	const toggleMember = () => {
		setValues({...values, isMember: !values.isMember })
	}

//(!email || !password || (!isMember && !firstName ) )

	const onSubmit = (e) => {

		e.preventDefault()
		const { firstName, lastName, email, password, city, zipCode, address, isMember } = values
		if(!email || !password || (!isMember && !firstName && !lastName)) {
			displayAlert()
			return
		}


		const currentUser = { firstName, lastName, email, password, city, zipCode, address }

		if (isMember) {
			setupUser({ 
				currentUser, 
				endPoint: 'login', 
				alertText: 'Login Successful! Redirecting...', 
			})
		} else {
			setupUser({
				currentUser, 
				endPoint:'register',
				alertText: 'User Created! Redirecting...',
			})
		}
	}


	useEffect(() => {
		if(user) {
			setTimeout(() => {
				navigate('/')
			}, 3000)
		}
	}, [user,navigate])




	return(
		<div>
			{!showSmallNavbar ? <Navbar /> : <NavbarSmall />}
			<Wrapper>
				<div className= 'full-page' onSubmit={onSubmit}>
				<form className ='form'>
				<Logo/>
				<h5>{values.isMember ? 'To Book Online Please Login' : 'To Book Online, Please Register'}</h5>
				{showAlert && <Alert />}

					{/* name input */}	

				{!values.isMember && (

		    		<FormRow 
						type = 'text'
						name = 'firstName'
						value = {values.firstName}
						handleChange = {handleChange}
						labelText = 'First Name'
				
					/> )}

				{!values.isMember && (

					<FormRow
						type= 'text'
						name= 'lastName'
						value={values.lastName}
						handleChange= {handleChange}
						labelText = 'Last Name'
					/>


				)}



					{/* email input */}
		
					<FormRow 
						type = 'email'
						name='email'
						value = {values.email}
						handleChange = {handleChange} 
				
					/> 
					
					{/* name password */}
		
					<FormRow 
						type = 'password'
						name='password'
						value = {values.password}
						handleChange = {handleChange} 
					/>


			
					<button type ='submit' className = 'btn btn-block' disabled={isLoading}>
					Submit
					</button>
				
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already  a member ?' }
					<button 
						type = 'button'
						className = 'member-btn'
						onClick = {toggleMember}
					>
						{values.isMember ? 'Register' : 'Login'}

				
					</button>
	
				</p>

				</form>
				</div>
			</Wrapper>
		</div>


	)
}

export default Register;
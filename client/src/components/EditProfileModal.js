import { useState, useEffect } from 'react'

import Wrapper from '../assets/wrappers/EditProfilePage'
import Button from '../assets/wrappers/Button';
import FormRow from './FormRow'
import Alert from './Alert'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';







const EditProfileModal = () => {

	const { displayAlert, showAlert, showEditProfile, user, isEditProfile , updateUser, showInfos} = useAppContext()

	const [values,setValues] = useState(user)

	const navigate = useNavigate()



	const handleChange = (e) => {
		setValues({...values, [e.target.name] : e.target.value})
		
	
	}

	const onSubmit = async (e) => {
		const {lastName, address, zipCode, city, email} = values
		e.preventDefault()

		if(!lastName || !address || !zipCode || !city || !email) {
			displayAlert()
			return
		}

		updateUser({ lastName, address, zipCode, city, email })
		showEditProfile()


	}





	return(
		<Wrapper>


			<form className = 'form' onSubmit ={onSubmit}>

				<h4 className ='title-form'>Modify My Personal informations</h4>

				{showAlert && <Alert />}
				<FormRow
					type= 'text'
					name= 'lastName'
					labelText = 'Last Name'
					value  = {values.lastName}
					handleChange={handleChange}

				/>

				<FormRow
					type= 'text'
					name= 'address'
					labelText = 'Address'
					value  = {values.address}
					handleChange={handleChange}

				/>

				<FormRow
					type= 'number'
					name= 'zipCode'
					labelText = 'Zip Code'
					value  = {values.zipCode}
					handleChange={handleChange}
				/>

				<FormRow
					type= 'text'
					name= 'city'
					value  = {values.city}
					handleChange={handleChange}
				/>

				<FormRow
					type= 'email'
					name= 'email'
					value = {values.email}
					handleChange={handleChange}
				/>


				<div className = 'container-buttons'>
					<Button onClick={showEditProfile} >Cancel</Button>
					<Button type = 'submit'>Confirm</Button>
				</div>


			</form>
		</Wrapper>
	)

}


export default EditProfileModal;
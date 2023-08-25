import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/ProfilePage'
import { useAppContext } from '../../context/appContext'

import CreateUserArray from '../../utils/createUserArray'
import CreateArrayOfObjectUser from '../../utils/createArrayOfObjectUser'

import EditButton from '../../components/EditButton';
import EditProfileModal from '../../components/EditProfileModal';

import AppointmentsContainer from '../../components/AppointmentsContainer.js'
import Avatar from '../../components/Avatar.js'

import { staffMembers } from '../../data' 


const Profile = () => {
	const { 
		showPersonalInfosUser, 
		user, isEditProfile, 
		showAppoitmentBooked, 
		showEditProfile, 
		appointmentsBooked, 
		futureAppointments, 
		historyAppointments, 
		getAppointmentsAllreadyBooked } = useAppContext()
	
	const navigate = useNavigate()




{/*	useEffect(()=> {
		showAppoitmentBooked()
	},[appointmentsBooked]) 

	useEffect(()=> {
		showAppoitmentBooked()
	},[]) 

	const milli = today.getTime()

	const test = appointmentsBooked.filter(object => 
		object.dateAppointment.getTime() < milli
	)


	{console.log(test)}*/}

	useEffect(()=> {
		showAppoitmentBooked()
	},[]) 



	return(
		<Wrapper>
			<div className = 'container-personal-infos'>

				<span className ='first-and-last-names'>{user.firstName} {user.lastName}</span>
				{user.address && user.city && user.zipCode? <span className = 'address-city-zipCode'>{user.address}, {user.zipCode} {user.city }</span> : null}
				{user.email ? <span className= 'email'>{user.email }</span> : null} 

			</div>

			{/*<div>
			<span className='appointments-booked'>Your Appointments</span>



			 	{futureAppointments.length === 0 ? <span className='no-appointments'>No appointment booked yet </span>:

			 	<div className = 'container-appointments'>
			 	<span className='future-appointments'>Future appointments:</span>
			 	<ul>
			 	{futureAppointments.map(dateInfos =>(
			 		<div className='container-appointments-booked' key={dateInfos._id}>
			 			<li className='date'>
			 				{dateInfos.weekDay} {dateInfos.month} {dateInfos.monthDay} {dateInfos.year}
			 			</li>
			 			<li className='time'>
			 				Time: {dateInfos.timeAppointment}
			 			</li>
			 		</div>
			 	))}
			 </ul>
			 </div>}

			 	{historyAppointments.length === 0 ? <span className='no-appointments'>No History </span>:

			 	<div className = 'container-appointments'>
			 	<span className='appointments-history'>Appointments history:</span>
			 	<ul>
			 	{historyAppointments.map(dateInfos =>(
			 		<div className='container-appointments-booked' key={dateInfos._id}>
			 			<li className='date'>
			 				{dateInfos.weekDay} {dateInfos.month} {dateInfos.monthDay} {dateInfos.year}
			 			</li>
			 			<li className='time'>
			 				Time: {dateInfos.timeAppointment}
			 			</li>
			 		</div>
			 	))}
			 </ul>
			</div>}




			 </div> */}


		{/*	 <AppointmentsContainer futureAppointments={futureAppointments} /> */}
		<AppointmentsContainer/> 
		
		{isEditProfile ? <EditProfileModal  /> : null}
			

		<EditButton />



		</Wrapper> 
	)
}

export default Profile
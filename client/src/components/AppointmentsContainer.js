
import { useAppContext } from '../context/appContext'
import CancelAppointmentButton from './CancelAppointmentButton.js'


const AppointmentsContainer = () => {
	
	const { 
		showAppoitmentBooked, 
		futureAppointments, 
		historyAppointments,  
		handleSliderAvatar, 
		handleCancelAvatar,
		handleFileChange } = useAppContext()


	return(
		<div>
			{futureAppointments.length === 0 ? <span className='no-appointments no-appointments-yet'>No appointment booked yet </span>:

			 	<div className = 'container-appointments'>
			 		{futureAppointments.length === 1 ? <span className='future-appointments'>Future appointment</span> : <span className='future-appointments'>Future appointments</span>} 
			 		
			 		<ul>
			 			{futureAppointments.map(dateInfos =>(
			 			<div className='container-appointments-booked' key={dateInfos._id}>
			 				<li className='date'>
			 					{dateInfos.weekDay} {dateInfos.month} {dateInfos.monthDay} {dateInfos.year}
			 				</li>
			 				<li className='time'>
			 					Time: {dateInfos.timeAppointment}
			 				</li>
			 				<CancelAppointmentButton key={dateInfos._id} {...dateInfos} />
			 			</div>
			 			))}
			 		</ul>

			 	</div>}


			 {historyAppointments.length === 0 ? null :

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

				<button onClick={handleFileChange}>hello</button> 
				            <input type="file" accept="image/*" onChange={handleFileChange} />

		</div>

	)

}

export default AppointmentsContainer


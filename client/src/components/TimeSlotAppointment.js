import { useEffect} from 'react'
import { timeSlot } from '../data'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/TimeSlotPage'
import ButtonModal from '../assets/wrappers/ButtonModal'
import { FaRegTimesCircle } from 'react-icons/fa'



const TimeSlotAppointment = () => {
	const { 
		closeTime, 
		selectTime, 
		slotTimeToBook, 
		selectedTime, 
		selectedDate, 
		createAppointment, 
		slotTime, 	
		getAppointmentsAllreadyBooked,		
		allFutureAppointmentsAllreadyBooked, 
		singleDateAppoitment,
		singleFutureAppointmentAllReadyBooked,
		hoursFutureAppointmentsAllreadyBooked } = useAppContext()


	const dayOfWeekName = selectedDate.toLocaleString(
		'en-us', {weekday: 'long'}
	);


	const dayOfMonth = selectedDate.getDate();


	const month = selectedDate.toLocaleString('en-us', { month: 'long' });


	useEffect(()=> {
		getAppointmentsAllreadyBooked()
	},[]) 

{/*}	{console.log(allFutureAppointmentsAlreadyBooked)}
	{console.log(dayAndTime)}

	const hello = dayAndTime[0]
	const miam = hello.dateAppointment
	


	const result = allFutureAppointmentsAlreadyBooked.filter(item => item.dateAppointment === )
	
	console.log(result) 


	const m = dayAndTime[0]
	const d = m.dateAppointment
	const date = d.toISOString().substring(0, 10); 
		const r = allFutureAppointmentsAllreadyBooked.map(object => ({
				...object,
				dateAppointment: object.dateAppointment.toISOString().substring(0, 10)
			
	})) 

	*/}
	



	//console.log(r)

	//const result = r.filter(item => item.dateAppointment === date)

	//console.log(result)

	return(
		<Wrapper>

			<div className = 'container-time-picker'>
				<i className = 'close-time-slot' onClick = {closeTime}><FaRegTimesCircle size = {32} color = 'grey' /></i>
				<h4 className = 'title'>Available Slots </h4>

				

				{selectedTime ? <ButtonModal>
									<div className = 'grid-modal'>
										<span className ='slot-selected'>{dayOfWeekName} {dayOfMonth} {month} at {selectedTime}</span>
										<button onClick={createAppointment}
											className = 'button-confirmation'
											>
												
												Please Confirm Your Appointment
										</button>
									</div>
								</ButtonModal>: null}

					<div className ='time-slot-container'>

					{slotTimeToBook.map((slot) => 
						<div 
							className ={slot.isTimeSelect === true ? 'no-display-time' : 'time-slot'} 
							key ={slot.id} 
							onClick= {()=> selectTime(slot.id,slot.time)}>
							
							<span className='display-time'>{slot.time}</span>
						</div>
					)}
					
				</div> 


			</div>}
		</Wrapper>
	)


}

export default TimeSlotAppointment;
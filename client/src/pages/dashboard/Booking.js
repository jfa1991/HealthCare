import Calendar from 'react-calendar'; 
import { useAppContext } from '../../context/appContext'

import TimeSlotAppointment from '../../components/TimeSlotAppointment'
import CalendarDaysAppointment from '../../components/CalendarDaysAppointment'



const Booking = () => {

	const { 
		isShowTime, 
		selectedDate, 
		selectedTime, 
		dayAndTime, 
		isSlotSelected } = useAppContext()




	return(
		<div>
			{!isShowTime ?  <CalendarDaysAppointment /> : <TimeSlotAppointment /> }

		</div>

	)
}

export default Booking;



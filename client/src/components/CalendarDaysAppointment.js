import Calendar from 'react-calendar'; 
import { useAppContext } from '../context/appContext'


const CalendarDaysAppointment = () => {

	const { selectedDate, onDateChange, tileDisabled, selectedTime } = useAppContext()

	


	return (
		<div>
			<div className = 'container'>
				<h4 className = 'title'>Book Online Your Appointment</h4>

				<Calendar className = 'tileClassName'
					defaultView = 'month' 
					maxDetail = 'month'
					next2Label = {null}
					prev2Label = {null}
					tileDisabled = {tileDisabled}
					locale = 'EN-US'
					minDate = {new Date ()}
					onChange= {onDateChange}
					value={selectedDate} 
				/>
			</div>

			<span>{selectedTime}</span>
			


		</div>
	)
}

export default CalendarDaysAppointment


import { useAppContext } from '../context/appContext'
import ButtonCancelAppointment from '../assets/wrappers/ButtonCancelAppointment'

const CancelAppointmentButton = ({_id}) =>{
	const { deleteAppointment } = useAppContext()


	return(
		<ButtonCancelAppointment>
			<button 
				type = 'button' 
				className = 'button-cancel'
				onClick ={()=> deleteAppointment(_id)} >
				Cancel Appointment
			</button>
		</ButtonCancelAppointment>

	)
}

export default CancelAppointmentButton;
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	LOGOUT_USER,
	TOGGLE_NAVBAR,
	HANDLE_CHANGE,
	CLOSE_NAVBAR,
	SELECT_DATE_APPOINTMENT,
	TILEDISABLED,
	SHOW_TIME,
	NO_SHOW_TIME,
	SELECT_TIME_APPOINTMENT,
	CREATE_APPOINTMENT_BEGIN,
	CREATE_APPOINTMENT_SUCCESS,
	CREATE_APPOINTMENT_ERROR,
	DELETE_APPOINTMENT_BEGIN,
	SHOW_INFOS_PROFILE_BEGIN,
	SHOW_INFOS_PROFILE_SUCCESS,
	SHOW_APPOINTMENTS_BEGIN,
	SHOW_APPOINTMENTS_SUCCESS,
	GET_APPOINTMENTS_ALLREADY_BOOKED_BEGIN,
	GET_APPOINTMENTS_ALLREADY_BOOKED_SUCCESS,
	SHOW_EDIT_PROFILE,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_SLIDER_AVATAR,
	HANDLE_CANCEL_AVATAR,
	HANDLE_FILE_CHANGE_AVATAR

} from './actions';


import { initialState } from './appContext.js'

const reducer = (state, action) => {



if(action.type === DISPLAY_ALERT) {
	return {
		...state,
		showAlert: true,
		alertType: 'danger',
		alertText: 'Please provide all values!',

	}
}

if(action.type === CLEAR_ALERT) {
	return {
		...state,
		showAlert: false,
		alertType: '',
		alertText: '' 
	}
}


if(action.type === SETUP_USER_BEGIN) {
	return { 
		...state, isLoading: true 
	}
	
}

if(action.type === SETUP_USER_SUCCESS ) {
	return { 
		...state, 
		isLoading: false,
		user: action.payload.user,
		token: action.payload.token,
		showAlert: true,
		alertType: 'success',
		alertText: action.payload.alertText,
	}
}

if(action.type === SETUP_USER_ERROR) {
	return {
		...state,
		isLoading: false,
		showAlert:true,
		alertType: 'danger',
		alertText: action.payload.msg,

	}
}

if(action.type === TOGGLE_NAVBAR) {
	return {
		...state,
		showSmallNavbar: !state.showSmallNavbar,
	}
}

if(action.type === LOGOUT_USER) {
	return {
		...initialState,
		user: null,
		token: null,
	}
	
}



if(action.type === HANDLE_CHANGE) {
	return {
		...state,
		[action.payload.name]: action.payload.value,

	}
}


if(action.type === CLOSE_NAVBAR) {
	return {
		...state,
		showSmallNavbar: false,

	}
}



if (action.type === SHOW_TIME) {
	
	const newArrayDayAndTimeToSelect = [...state.dayAndTimeToSelect]



	newArrayDayAndTimeToSelect[0].dateAppointment = action.payload.newDate


	const newTimesArray = [...state.slotTimeToBook]


	
	return {
		...state,
		isShowTime: true,
		selectedDate: action.payload.newDate,
		dayAndTimeToSelect:newArrayDayAndTimeToSelect,
	}
}

if (action.type === NO_SHOW_TIME) {



	const index = state.temporaryIndexTimeSelected
	const newArray = [...state.slotTimeToBook]
	newArray[index].isTimeSelect = false


	return {
		...state,
		isShowTime: false,
		slotTimeToBook: newArray,
		selectedTime: null,

	}
}



if (action.type === SELECT_TIME_APPOINTMENT) {

	
	// Goal below we loop through slotTimeToBook and find the time that corresponds
	// the time chosen in the front-end, time will contain the following object
	// => {id: 1, time: '08:00', isTimeSelect: 'false'}
	

	const time = state.slotTimeToBook.find((slotTime) => slotTime.id === action.payload.id)
	

	// Goal below => we need to find in array arraySlotTimeToBook where 
	// the slot choose was positioned in the array
	
	const index = state.slotTimeToBook.findIndex((slotTime) => slotTime.id === action.payload.id)

	const newArraySlotTimeToBook = [...state.slotTimeToBook]

	// Now that we know index, where the slot was positioned, 
	// we can define which object in the array will have the property isSelected as true

	newArraySlotTimeToBook[index].isTimeSelect = true

	// e.g console.log(newArray[index]) => {id: 1, time: '08:00', isTimeSelect: true}
	
	


	const timeSelected = newArraySlotTimeToBook[index].time


	const newArraySelectedDayAndTime = [...state.dayAndTimeToSelect]

	const objectDayAndTime = newArraySelectedDayAndTime[0]

	objectDayAndTime.timeAppointment = timeSelected



	return {
		...state,
		selectedTime: action.payload.slot,
		slotTimeToBook: newArraySlotTimeToBook,
		dayAndTimeToSelect: newArraySelectedDayAndTime,
		temporaryIndexTimeSelected: index,

	}
}

if (action.type === CREATE_APPOINTMENT_BEGIN) {
	return {
		...state,
		isLoading: true,
		
	}
}

if (action.type === CREATE_APPOINTMENT_SUCCESS) {
	return {
		...state,
		isLoading: false,
		selectedTime:false
	}
}

if (action.type === DELETE_APPOINTMENT_BEGIN) {
	return {
		...state,
		isloading:true,
	}
}

if (action.type === SHOW_INFOS_PROFILE_BEGIN) {
	return {
		...state,
		isLoading: true,
	}
}

if (action.type === SHOW_INFOS_PROFILE_SUCCESS) {
	return {
		...state,
		isLoading: false,

	}
}


// below Goal is to show personal appointments booked by Client

if (action.type === SHOW_APPOINTMENTS_BEGIN) {
	return {
		...state,
		isLoading: true,
	}
}

// below Goal is to show personal appointments booked by Client


if (action.type === SHOW_APPOINTMENTS_SUCCESS) {

	const infosAppointments = action.payload.appointments 

	// GOAL below  => convert Zulu time in UTC


	const temporaryAppointmentSelected = infosAppointments.map(appointment => ({
		...appointment,
		dateAppointment: new Date(appointment.dateAppointment)
			
	})) 




	// GOAL below => filter appointments between future and past appointment 
	// booked by client

	
	// tempHistoryAppointments are past appointments based on date of today


	const tempHistoryAppointments = temporaryAppointmentSelected.filter(appointment =>
			state.todayInMiliseconds > appointment.dateAppointment
		)


	// tempFutureAppointments are past appointments based on date of today


	const tempFutureAppointments = temporaryAppointmentSelected.filter(appointment =>
			state.todayInMiliseconds < appointment.dateAppointment
		)



	// GOAL => add 3 more properties to newArrayHistoryAppointments, those are 
	// dayofWeekName, dayOfMonth and month
	// dayOfWeekName => e.g Monday, dayOfMonth => e.g 11, month e.g => January
	// we make use of property dateAppointment: Fri Jan 13 2023 in the object 
	// to get them


	const newArrayHistoryAppointments = tempHistoryAppointments.map(appointment => {
		const dayOfWeekName = appointment.dateAppointment.toLocaleString('en-us', {weekday: 'long'});
		const dayOfMonth = appointment.dateAppointment.getDate();
		const month = appointment.dateAppointment.toLocaleString('en-us', { month: 'long' });
		const year = appointment.dateAppointment.getFullYear()
		


		return {
			...appointment,
			weekDay:dayOfWeekName,
			monthDay: dayOfMonth,
			month:month,
			year: year
		}

	})


	// GOAL => add 3 more properties to tempHistoryAppointments, those are 
	// dayofWeekName, dayOfMonth and month
	// dayOfWeekName => e.g Monday, dayOfMonth => e.g 11, month e.g => January
	// we make use of property dateAppointment: Fri Jan 13 2023 in the object 
	// to get them


	const newArrayFutureAppointments = tempFutureAppointments.map(appointment => {
		const dayOfWeekName = appointment.dateAppointment.toLocaleString('en-us', {weekday: 'long'});
		const dayOfMonth = appointment.dateAppointment.getDate();
		const month = appointment.dateAppointment.toLocaleString('en-us', { month: 'long' });
		const year = appointment.dateAppointment.getFullYear()
		


		return {
			...appointment,
			weekDay:dayOfWeekName,
			monthDay: dayOfMonth,
			month:month,
			year: year
		}
	})


		 
	return {
		...state,
		isLoading: false,
		historyAppointments:newArrayHistoryAppointments,
		futureAppointments: newArrayFutureAppointments


	}
}


// below => Goal is to get from DB all appointments booked by all the clients
// in order to remove slot hours from Front-End


if(action.type === GET_APPOINTMENTS_ALLREADY_BOOKED_BEGIN) {
	return {
		...state,
		isLoading:true,
	}
}


// below => Goal is to get from DB all appointments booked by all the clients
// in order to remove slot hours from Front-End

if(action.type === GET_APPOINTMENTS_ALLREADY_BOOKED_SUCCESS) {


	// get all the appointment in DB

	const allAppointments = action.payload.allAppointments

	// GOAL below  => convert Zulu time in UTC

	const allTemporaryAppointments = allAppointments.map(appointment => ({
		...appointment,
		dateAppointment: new Date(appointment.dateAppointment)
			
	})) 



	// GOAL below => filter appointments in allTemporaryAppointment, select only those
	// which are in the future 


	const allFutureAppointments = allTemporaryAppointments.filter(appointment =>
		state.todayInMiliseconds < appointment.dateAppointment

	)


	
	// Goal below => transform in string format value of property dateAppointment
	// in object dayAndTimeToSelect

	const objectDayAndTime = state.dayAndTimeToSelect[0]
	const d = objectDayAndTime.dateAppointment
	const dateAppointmentStringFormat = d.toISOString().substring(0, 10);  

	// Goal below transform in string format, the value of property dateAppointment
	// of each object present in Array allFutureAppointments created previously in reducer

	const allFutureAppointmentStringFormat = allFutureAppointments.map(appointment => ({
		...appointment,
		dateAppointment: appointment.dateAppointment.toISOString().substring(0, 10)
			
	})) 


	// Goal below check whether the date selected in Front-End is already in DB

	const objectFutureAppointment = allFutureAppointmentStringFormat.filter(appointment => appointment.dateAppointment === dateAppointmentStringFormat)?.[0]


	// if the date selected in Front-end is in DB, state futureAppointment takes that value
	// when not, it takes value null 
	
	const futureDateAppointment = objectFutureAppointment ? objectFutureAppointment.dateAppointment : null


	// Goal below create an array with all the hours that are related to a date already present in DB
	// that array may not containg any hour related to the date


	const hoursAlreadyBooks = futureDateAppointment ? allTemporaryAppointments.map(index => index.timeAppointment) : null


	const copyStateSlotTimeToBook = [...state.slotTimeToBook]

	// if array contais hours related to date selected in front-end
	// we do the following operation => for each slot that we can book
	// we will change value isTimeSelect if already contained in array
	// hoursAlreadyBookd => the goal is to remove the slot from fron-end


	if (hoursAlreadyBooks) {
		for (const hour of hoursAlreadyBooks) {
			copyStateSlotTimeToBook.forEach(timeSlot => {
				if (hour === timeSlot.time) {
					timeSlot.isTimeSelect = true
				}
    		})
		}
	}
		
	
	return {
		...state,
		isLoading:false,
		allFutureAppointmentsAllreadyBooked: allFutureAppointments,
		singleDateAppoitment: dateAppointmentStringFormat,
		singleFutureAppointmentAllReadyBooked: futureDateAppointment,
		hoursFutureAppointmentsAllreadyBooked: hoursAlreadyBooks,

	}
}


if (action.type === SHOW_EDIT_PROFILE) {
	return {
		...state,
		isEditProfile: !state.isEditProfile, 
	}
}

if (action.type === UPDATE_USER_BEGIN) {
	return {
		...state,
		isLoading:true,
	}
}

if (action.type === UPDATE_USER_SUCCESS) {
	return {
		...state,
		isLoading:false,
		user: action.payload.user,
		token: action.payload.token,
		showAlert: true,
		alertType: 'success', 
		alertText: 'User Profile Updated'
	}
}

if (action.type === UPDATE_USER_ERROR) {
	return {
		...state,
		isLoading: false,
		showAlert: true,
		alertType: 'danger',
		alertText: action.payload.msg, 
	}
}

if (action.type === HANDLE_SLIDER_AVATAR) {

	const zoomValue = action.payload.value
	const { avatarProfilePicture } = state
	const { zoom } = avatarProfilePicture

	let newAvatarPicture  = {
		...avatarProfilePicture,
		zoom:4 
	}
	
	return {
		...state,
		avatarProfilePicture: newAvatarPicture
	}
}


if (action.type === HANDLE_CANCEL_AVATAR) {

	const { avatarProfilePicture } = state
	const { cropperOpen } = avatarProfilePicture

	let newAvatarPicture  = {
		...avatarProfilePicture,
		cropperOpen:false
	}


	return {
		...state,
		avatarProfilePicture: newAvatarPicture
	}
}

if (action.type === HANDLE_FILE_CHANGE_AVATAR) {
	
	const event = action.payload.e
	console.log(event)
	const { avatarProfilePicture } = state
	const { img, cropperOpen } = avatarProfilePicture

	//let url = URL.createObjectURL(event.target.files[0]);

	//console.log(url);

	let newAvatarPicture = {
		...avatarProfilePicture,
		//img:url,
		cropperOpen: true
	}

	console.log(newAvatarPicture)

	return {
		...state,
		avatarProfilePicture: newAvatarPicture
	}


}




throw new Error(`No such action: ${action.type}`)

}

export default reducer
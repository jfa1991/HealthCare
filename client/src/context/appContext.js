import React, { useContext, useReducer, useEffect, useState } from 'react'
import reducer from './reducers'
import axios from 'axios'
import {timeSlot, selectedSlot, avatarPicture } from '../data'

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_NAVBAR,
	LOGOUT_USER,
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
	HANDLE_FILE_CHANGE_AVATAR,

} from './actions'


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')



{/*user ? JSON.parse(user):null */}

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user):null,
	token: token,
	showSmallNavbar: false,
	closeSmallNavbar: true,
	isShowTime: false,
	selectedDate: null,
	selectedTime: null,
	slotTimeToBook:timeSlot,
	temporaryIndexTimeSelected: 0,
	dayAndTimeToSelect: selectedSlot,
	isSlotSelected: false,
	isEditProfile: false,
	todayInMiliseconds: new Date().getTime(),
	appointmentsBooked: [],
	historyAppointments:[],
	futureAppointments:[],
	allFutureAppointmentsAllreadyBooked:[], // array containing all the appointments in DB
	singleFutureAppointmentAllReadyBooked: null, // date selected to check if in DB
	singleDateAppoitment:null, // string format related to value of property dateAppointment in object dayAndTime,
	hoursFutureAppointmentsAllreadyBooked: [], // array containing all the hours related to a date and presents in DB
	avatarProfilePicture: avatarPicture

}

const AppContext = React.createContext();


const AppProvider = ({children}) => {


	const [state, dispatch] = useReducer(reducer, initialState)
	const [scrollPosition, setScrollingPosition] = useState(0)


	const authFetch = axios.create({
		baseURL: '/api/v2',
	})

	// request

	authFetch.interceptors.request.use(
		(config)=>{
			config.headers['Authorization'] = `Bearer ${state.token}`
			return config
		}, 
		(error)=>{
			return Promise.reject(error)
		}
	)

	// response

	authFetch.interceptors.response.use(
		(response)=>{
			return response
		}, 
		(error)=>{
			console.log(error.response.data)
			if(error.response.status === 401) {
				console.log('Auth Error')

			}
			return Promise.reject(error)
		}
	)
		 

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT})
		},3000)
	}

	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem('user', JSON.stringify('user'))

		localStorage.setItem('token', token)
	}

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
	}



	const setupUser = async ({currentUser, endPoint, alertText}) => {

		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const { data } = await axios.post(`/api/v2/auth/${endPoint}`, currentUser)
			const { user, token } = data

			// when posting to the server, we get a response, 
			//in our controller we set the response to give back the user and the token, 
			// data is an object having user and token as a properties
		
		dispatch({
			type: SETUP_USER_SUCCESS,
			payload: { user, token, alertText}								
		})

		addUserToLocalStorage({ user, token })

		} catch (error) {

			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg }
			})


			// data msg coming from middleware 
			 // error-handler in server
		}	

		clearAlert()

	}

	// close Navbar when scrolling

  	const handleScroll = () => {

   		const currentScrollPos = window.pageYOffset;

   		const topPage = 0

 		if(currentScrollPos > topPage) {
   			dispatch({ type: CLOSE_NAVBAR})

   		}



 	}

 	// close Navbar when clicking on Link

 	const closeNavbar = (e) =>{

 		dispatch({ type: CLOSE_NAVBAR})
 	}

 	// toogle Navbar

	const toggleNavbar = () => {
		dispatch({ type: TOGGLE_NAVBAR })

	}

	const logOutUser = () => {
		dispatch({ type: LOGOUT_USER })
		removeUserFromLocalStorage()

	}



	const onDateChange = (date) => {

		const newDate = date
		dispatch({ 
			type: SHOW_TIME, payload: { newDate } })
	}




	const tileDisabled = ({ activeStartDate, date, view }) => {
		return date < new Date() || date.getDay() === 6  || date.getDay() === 0

	}


	const closeTime = () => {
		dispatch({ type: NO_SHOW_TIME })
	}



	const selectTime = (id,slot) => {
		dispatch({ type: SELECT_TIME_APPOINTMENT, payload: { id, slot } })

	}



	const createAppointment = async () => {
		dispatch({ type: CREATE_APPOINTMENT_BEGIN })
		try {
			const {dayAndTimeToSelect} = state
			const objectDayAndTime = dayAndTimeToSelect[0]
			const {dateAppointment, timeAppointment} = objectDayAndTime



			await authFetch.post('/appointment/create-appointment', {
				dateAppointment,
				timeAppointment
			})
			dispatch({
				type: CREATE_APPOINTMENT_SUCCESS })

		} catch(error) {
			if(error.response.status === 401) return
				dispatch({
					type: CREATE_APPOINTMENT_ERROR,
					payload: { msg: error.response.data.msg},
				})

		}

		clearAlert()
	}


	const showEditProfile = () => {
		dispatch({ type: SHOW_EDIT_PROFILE })

	}

	const updateUser = async(currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })

		try{
			const {data} = await authFetch.patch('/auth/updateUser', currentUser)
			
			const { user, token } = data

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, token }
			})



			addUserToLocalStorage({ user, token })
		
		} catch(error) {
			if(error.response.status !==401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
		clearAlert()
	}




	const showPersonalInfosUser = async () => {
		dispatch({ type: SHOW_INFOS_PROFILE_BEGIN })


		try {
			const { data } = await authFetch.get('/auth/infos')

			
			const { user, token } = data



			dispatch({
				type: SHOW_INFOS_PROFILE_SUCCESS,
				payload: { user },



			})


		} catch (error) {
			logOutUser()
		}
		clearAlert()


	}

	const showAppoitmentBooked = async () => {
		dispatch({ type: SHOW_APPOINTMENTS_BEGIN}) 


		
		try {
			const { data } = await authFetch.get('/appointment/personal-appointments')

			const { appointments} = data



			dispatch({ 
				type: SHOW_APPOINTMENTS_SUCCESS,
				payload: { appointments },
			})


		} catch (error) {
			logOutUser()
		} 


	}

	const getAppointmentsAllreadyBooked = async () =>{
		dispatch({ type: GET_APPOINTMENTS_ALLREADY_BOOKED_BEGIN })

		try {
			const { data } = await authFetch.get('/appointment/all-appointments')

			const { allAppointments } = data

			dispatch({
				type: GET_APPOINTMENTS_ALLREADY_BOOKED_SUCCESS,
				payload: { allAppointments }
			})
		} catch (error) {
			logOutUser()
		}
	}

	const deleteAppointment = async (appointmentId) => {
		dispatch({ type: DELETE_APPOINTMENT_BEGIN })

		try {
			await authFetch.delete(`/appointment/${appointmentId}`)
			showAppoitmentBooked()
 		} catch (error) {
 			logOutUser()
 		}
	}


	const handleSliderAvatar = (event, value) => {
		dispatch({ 
			type: HANDLE_SLIDER_AVATAR,
			payload: value 
		})
	}

	const handleCancelAvatar = ()=> {
		dispatch({ type: HANDLE_CANCEL_AVATAR})
	}

	const handleFileChange = (e) => {
		dispatch({ 
			type: HANDLE_FILE_CHANGE_AVATAR,
			payload: e 
		})
	}



	


	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name,value } })

	}





	return(
		<AppContext.Provider 
			value = {{
				...state,
				displayAlert,
				setupUser,
				toggleNavbar,
				logOutUser,
				handleScroll,
				closeNavbar,
				onDateChange,
				tileDisabled,
				closeTime,
				selectTime,
				createAppointment,
				showPersonalInfosUser,
				showEditProfile,
				updateUser,
				showAppoitmentBooked,
				getAppointmentsAllreadyBooked,
				deleteAppointment,
				handleSliderAvatar,
				handleCancelAvatar,
				handleFileChange



				
			}}>

			{children}

		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext) 

}


export { AppProvider, initialState, useAppContext }

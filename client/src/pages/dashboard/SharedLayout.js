import React from 'react'
import { Outlet } from 'react-router-dom'
import { SmallSideBar, BigSideBar, Navbar, NavbarSmall } from '../../components'
import { useAppContext } from '../../context/appContext'
import Booking from './Booking';
import Profile from './Profile'
import Wrapper from '../../assets/wrappers/CalendarPage'

const SharedLayout = () => {
	const { showSmallNavbar } = useAppContext ()

	return(
		<div>
			{/*<div>
				<SmallSideBar/>
				<BigSideBar />
			</div> */}

			{!showSmallNavbar ? <Navbar /> : <NavbarSmall />} */}

			<Wrapper>
				<Outlet /> 
			</Wrapper>
		</div>
	)
}

export default SharedLayout

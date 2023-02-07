import { useState } from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Navbar'


import { FaAlignLeft, FaUserCircle,FaCaretDown } from 'react-icons/fa'


const LogoutButton = () => {
	const [showLogout, setShowLogout] = useState(false)
	const { toggleSideBar, logOutUser, user } = useAppContext ()

	return(
		<div className = 'btn-container'>



			<button
				type = 'button'
				className = 'btn'
				onClick = {() => setShowLogout(!showLogout)}>

			<FaUserCircle />
				{user?.firstName}
			<FaCaretDown />

			
			</button>

			

			<div className={showLogout? 'dropdown show-dropdown' :'dropdown'}>
				<button 
					type='button' 
					className ='dropdown-btn'
					onClick ={logOutUser}>
					logout
				</button>
			</div>

		</div>
	)
}

export default LogoutButton


					
{/*	
	<button 
		type = 'button' 
		className='btn' 
		onClick = {() => setShowLogout(!showLogout)}>
						
		<FaUserCircle />
			{user?.firstName}
		<FaCaretDown />
	</button>

	<div className={showLogout? 'dropdown show-dropdown' :'dropdown'}>
		<button 
			type='button' 
				className ='dropdown-btn'
				onClick ={logOutUser}>
				logout
			</button>
	</div>

*/}

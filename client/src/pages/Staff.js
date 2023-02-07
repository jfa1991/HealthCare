import { CardStaff, Navbar, NavbarSmall } from '../components'

import Wrapper from '../assets/wrappers/StaffPage'
import { useAppContext } from '../context/appContext'


const Staff = () => {
	const { showSmallNavbar } = useAppContext()

	console.log(new Date())

	return(
		<Wrapper>
			{!showSmallNavbar ? <Navbar /> : <NavbarSmall />}
			
				<h3 className ='title'>Meet Our Staff</h3>

				<CardStaff />
		</Wrapper>

	)
}

export default Staff
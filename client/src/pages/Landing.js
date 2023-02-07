import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarSmall } from '../components'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/alternative.svg'
import { useAppContext } from '../context/appContext'

const Landing = () => {
	const { showSmallNavbar } = useAppContext()


	return(
		<Wrapper>
		 	{!showSmallNavbar ? <Navbar /> : <NavbarSmall />}


			
			<div className = 'container page'>
				<div className ='info'>

					<h1></h1>
					<p>
					Jinsey is a medical practice offering general medical consultation and specialised as well in heart disease. 
					Moreover, our patients can beneficiate of nursing and home care.
					</p>
					<Link to ='/contact' className ='btn btn-hero'>Contact Us
					</Link>
				</div>

			<img src={main} alt='' className ='img main-img'/>


			</div>
		</Wrapper>
	)
}

export default Landing
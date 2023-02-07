import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks'
import NavLinksLogin from './NavLinksLogin'

import Wrapper from '../assets/wrappers/NavbarSmallPage'

import { FaAlignLeft } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'




const NavbarSmall = () => {



	const { showSmallNavbar, closeSmallNavbar, toggleNavbar, handleScroll, user } = useAppContext()

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
    	return () => window.removeEventListener('scroll', handleScroll);
	}, [])

	return(
		<Wrapper>
			 <div className='small-nav-container'>

				<div className = 'logo-hamburger-container'>
					<Logo />


					<button type= 'button' className='toggle-btn btn-hamburger' onClick ={toggleNavbar}>
						<FaAlignLeft size = {32} color = 'grey' />
					</button>
				</div>

				{!user ? <NavLinks /> : <NavLinksLogin />}
			</div>
		</Wrapper>
	)
}

export default NavbarSmall
import React, { useState } from 'react';
import Logo from './Logo';
import main from '../assets/images/main.svg';
import { FaAlignLeft, FaUserCircle,FaCaretDown } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import LogoutButton from './LogoutButton'
import NavLinks from './NavLinks'
import NavLinksLogin from './NavLinksLogin'
import NavbarSmall from './NavbarSmall'

import { ImLeaf } from 'react-icons/im'

const Navbar = () => {
	const { toggleNavbar, logOutUser, showSmallNavbar, user } = useAppContext ()

	return(
		<Wrapper>
			<div className ='nav-center'>

				<Logo />

				{user && <LogoutButton /> }


				
				<button type= 'button' className='toggle-btn btn-hamburger' onClick ={toggleNavbar}>
					<FaAlignLeft size = {32} color = 'grey' />
				</button>

				{!user ? <NavLinks /> : <NavLinksLogin/>}

			</div>

		</Wrapper>
	)
}

export default Navbar

				
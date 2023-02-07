import { linksNavbar } from '../utils/links.js'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const NavLinks = () => {
	const { toggleNavbar, showSmallNavbar, closeNavbar } = useAppContext()
	return(
		<div className = 'nav-links'>
		 {linksNavbar.map((link) => {
		   const { id, text, path } = link
		   return(
			  <NavLink
			   className = 'nav-link'
			   to = {path}
			   key= {id}
			   onClick = {closeNavbar}>
			   {text}
			 </NavLink>
			)
		 })}
	   </div>
    )
}

export default NavLinks;
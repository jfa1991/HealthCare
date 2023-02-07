import { linksLoginNavbar } from '../utils/links.js'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const NavLinksLogin = () => {
	const { closeNavbar } = useAppContext()
	return(
		<div className = 'nav-links'>
		 {linksLoginNavbar.map((link) => {
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

export default NavLinksLogin;
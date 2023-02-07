import { useAppContext } from '../context/appContext'


const BigSideBar = () => {
	const { showSmallNavbar, toggleNavbar } = useAppContext()
	return(
		<div>Big Side Bar </div>

	)
}

export default BigSideBar
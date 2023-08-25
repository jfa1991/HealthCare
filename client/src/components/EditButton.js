import { useAppContext } from '../context/appContext'
import ButtonEdit from '../assets/wrappers/ButtonEdit'


const EditButton = () => {
	const { user, showEditProfile, isEditProfile  } = useAppContext()

	return(
		<ButtonEdit isEditProfile={isEditProfile}>
		
		<button className ='button-edit' onClick ={showEditProfile}>{!user.address || !user.city || !user.zipCode ? 'Complete Your Personal Informations' : 'Update Personal Informations'}</button>
		</ButtonEdit>

	)

}

export default EditButton
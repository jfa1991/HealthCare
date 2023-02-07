import AvatarEditor from 'react-avatar-editor'
import { useAppContext } from '../context/appContext'


const Avatar = () => {
	const {  
		handleSliderAvatar, 
		handleCancelAvatar,
		handleFileChange } = useAppContext()
	return(
		<div>
			<AvatarEditor 
				width={180}
              	height={180}
              	borderRadius ={100}
              	border ={10}
              	rotate={0} />
           	<input type="file" accept="image/*" onChange={handleFileChange} />
		</div>
	)
}

export default Avatar
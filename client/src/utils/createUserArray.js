import { useAppContext } from '../context/appContext'



const CreateUserArray = () => {
	const { user } = useAppContext()

	const newArrayProfileUser = { ...user } // copy object, not the reference in memory


	delete newArrayProfileUser._id // remove key-value pair "_id"
	delete newArrayProfileUser.__v // remove key-value pair  "__v"



	let arrayValuesUser = Object.values(newArrayProfileUser) // create array with only values

	const lastName = arrayValuesUser[2] // store value of third item of array arrayValuesUser into variable


	arrayValuesUser.splice(2, 1) // remove third items from array arrayValuesUser
								// start at index 2, remove 1 item

	
	arrayValuesUser.splice(1,0, lastName) // add variable lastName to array 
									// start at index 1, add 1 item, add lastName




	return arrayValuesUser
}




export default CreateUserArray
import CreateUserArray from './createUserArray.js'


const CreateArrayOfObjectUser = () => {

	const arrayUser = CreateUserArray()
	console.log(arrayUser)


	let values = ['a', 'b', 'c', 'd', 'e'];
	let keys = [1, 2, 3, 4, 5];

	let array = []

	for (let i = 1; i < arrayUser.length; i++) {
		array.push(i)
		console.log(array)

	}


	let obj = {};

	for (let i = 0; i <= 4; i++) {
		let key = array[i];
		let value = arrayUser[i];
	
		obj[key] = value;
	}

	console.log(obj);
	return obj

}


export default CreateArrayOfObjectUser
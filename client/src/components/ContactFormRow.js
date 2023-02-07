

const ContactFormRow = ({ type, name,value,handleChange,labelText } ) => {
	return(
		<div className = 'form-row contact-form'>
			<label htmlFor ={name} className ='form-label'>
				{labelText || name}
			</label>
			<input
				type= {type}
				value={value}
				name={name}
				onChange={handleChange}
				className={type === 'textarea' ? 'form-textarea' : 'form-input'}/>
		</div>
	)
}

export default ContactFormRow;


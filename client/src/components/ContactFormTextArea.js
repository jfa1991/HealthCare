const ContactFormTextArea = ({ type, name,value,handleChange,labelText } ) => {
	return(
		<div className = 'form-row contact-form'>
			<label htmlFor ={name} className ='form-label'>
				{labelText || name}
			</label>
			<textarea 
				className ='form-textarea'
				type= {type}
				value={value}
				name={name}
				onChange = {handleChange}>
			</textarea>
		</div>
	)
}

export default ContactFormTextArea;


			
import styled from 'styled-components';


const Wrapper = styled.div`
	
	position:fixed;
	top:6.5em;
	left:0;
	right:0;
	bottom:0;
	background:rgba(0,0,0,0.4);
	display:flex;
	align-items: center;
	justify-content: center;
	z-index: 0;
	#modal {
		background: #E4DACD;  
	};


	.title-form {
		font-size:1.35rem;
	}

	.container-buttons {
		display:flex;
		padding:0;
		width:200px;
		margin-left:auto;
	}



`

export default Wrapper
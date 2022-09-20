import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EmployerRegisterForm.css'
import CSRFToken from './CSRFToken'


const EmployerRegisterForm = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({
		username: "",
		email: "",
		phone_number: "",
		password: "",
		confirmPassword: ""
	})

	const register =(e)=>{
		alert("Data Sent to Backend!")
		navigate('/login')
	}
	return (
		<div className="EmployerRegisterForm">
			<form onSubmit={register}>
				<CSRFToken/>
				<div>
					<label>Username:</label>
					<input type="text" value={data.username} onChange={(e)=> setData({...data,username: e.target.value})}/>
				</div>
				<div>
					<label>Staff phone:</label>
					<input type="text" value={data.phone_number} onChange={(e)=> setData({...data,phone_number: e.target.value})}/>
				</div>
				<div>
					<label>Staff email:</label>
					<input type="email" value={data.email} onChange={(e)=> setData({...data,email: e.target.value})}/>
				</div>
				<div>
					<label>Password:</label>
					<input type="password" value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}/>
				</div>
				<div>
					<label>Confirm Password:</label>
					<input type="password" value={data.confirmPassword} onChange={(e)=> setData({...data,confirmPassword: e.target.value})}/>
				</div>
			</form>
			<button onClick={register}>Sign Up</button>
		</div>
	)
}

export default EmployerRegisterForm
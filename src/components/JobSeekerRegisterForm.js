import React,{ useState } from 'react'
import '../styles/JobSeekerRegisterForm.css'
import CSRFToken from './CSRFToken'
import { useNavigate } from "react-router-dom"


const JobSeekerRegisterForm = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({
		username: "",
		national_id: "",
		phone_number: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const register =(e)=>{
		alert("Data Sent to Backend!")
		navigate('/login')
	}

	return (
		<div className="JobSeekerRegisterForm">
			<form onSubmit={register}>
				<CSRFToken/>
				<div>
					<label>Full Names:</label>
					<input type="text" value={data.username} onChange={(e)=> setData({...data,username: e.target.value})}/>
				</div>
				<div>
					<label>National ID:</label>
					<input type="text" value={data.national_id} onChange={(e)=> setData({...data,national_id: e.target.value})} required/>
				</div>
				<div>
					<label>Phone number:</label>
					<input type="text" value={data.phone_number} onChange={(e)=> setData({...data,phone_number: e.target.value})} required/>
				</div>
				<div>
					<label>Email:</label>
					<input type="text" value={data.email} onChange={(e)=> setData({...data,email: e.target.value})} required/>
				</div>
				<div>
					<label>Password:</label>
					<input type="password" value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} required/>
				</div>
				<div>
					<label>Confirm Password:</label>
					<input type="password" value={data.confirmPassword} onChange={(e)=> setData({...data,confirmPassword: e.target.value})} required/>
				</div>
			</form>
			<button onClick={register}>Sign Up</button>
		</div>
	)
}

export default JobSeekerRegisterForm 
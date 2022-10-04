import React,{ useState } from 'react'
import '../styles/JobSeekerRegisterForm.css'
import CSRFToken from './CSRFToken'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Cookies from 'js-cookie'


const JobSeekerRegisterForm = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({
		username: "",
		national_id: "",
		phone_number: "",
		email: "",
		password: "",
		re_password: ""
	})

	const isFormValid = formData =>{
		if (formData.username ==="") {
			return false
		} else if(formData.national_id ===""){
			return false

		} else if(formData.phone_number ===""){
			return false
		
		} else if(formData.email ===""){
			return false
		
		} else if(formData.password ===""){
			return false
		
		} else if(formData.re_password ===""){
			return false
		}else if(formData.re_password !== formData.password){
			alert("Both passwords should match.")
			return false
		}else{
			return true
		}
	}

	const register = async (e)=>{
		e.preventDefault()

		if(isFormValid(data)){
			const names = data.username.split(" ");
				
			let lastName = "";
			
			names.forEach((name) => {
				lastName = lastName.concat(name).concat(" ");
			});

			const body = JSON.stringify({ ...data, first_name:names[0],last_name: lastName.trim() });

			console.log('body: ', body)

	        const config = { 
	            headers: {
	                Accept: "application/json",
	                "Content-Type": "application/json",
	                "X-CSRFToken": Cookies.get("csrftoken"),
	            },
	        };


			try {
	            const res = await axios.post(
	                'http://localhost:8000/users/register',
	                body,
	                config
	            );

	            console.log("Respose obejct: ", res);

	            if (res.data.error) {
	                alert(res.data.error);
	            } else if(res.data.success) {
	                console.log("Account register view says: ", res.data.success);

	                navigate('/login')
	            }
	        } catch (error) {
	            alert(error)
	        }

		}else{
			alert("Kindly fill in all the fields correctly first.")
		}

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
					<input type="password" value={data.re_password} onChange={(e)=> setData({...data,re_password: e.target.value})} required/>
				</div>
			</form>
			<button onClick={register}>Sign Up</button>
		</div>
	)
}

export default JobSeekerRegisterForm 
import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../styles/SignUp.css'
import { Icon } from '@iconify/react';
import JobSeekerRegisterForm from './JobSeekerRegisterForm'
import EmployerRegisterForm from './EmployerRegisterForm'


const SignUp = () => {
	const [state, setState] = useState({
		selectionOption: "",
		proceed: false
	})
	const navigate = useNavigate()

	const signUp = ()=>{
		if (state.selectionOption === "jobSeeker") {
			alert(state.selectionOption)
			setState({...state,proceed: true})		
		} else if(state.selectionOption === "employer") {
			alert(state.selectionOption)
			setState({...state,proceed: true})
		}
	}

	return (
		<div className="SignUp">
			<div className="signUp__container">
				<div className="illustrator__container">

				</div>
				<div className="signUp__details">
					<div className="signUp__prompt">
						{state.proceed === true?(<Icon icon="eva:arrow-back-outline" color="#009aee" onClick={()=>{setState({...state,selectionOption: "",proceed: false})}}/>):""}
						<p>Already Have An Account?</p>
						<button onClick={()=> navigate('../login')}>Sign In</button>
					</div>
					<h3>Welcome To Jobs-Hub</h3>
					<h4>Sign Up</h4>
					{state.proceed !== true?(<div className="signUp__main">
						<p>Which Account Would You Like?</p>
						<form>
							<label><input type="radio" value="jobSeeker" name="choice" onClick={(e)=> setState({...state,selectionOption: e.target.value})}/>Job Seeker Account</label>
							<label><input type="radio" value="employer" name="choice" onClick={(e)=> setState({...state,selectionOption: e.target.value})}/>Employer Account</label>
						</form>
						<button onClick={signUp}>Proceed</button>
					</div>):state.selectionOption === "employer"?(<EmployerRegisterForm/>):(<JobSeekerRegisterForm/>)}
				</div>
			</div>	
		</div>
	)
}

export default SignUp
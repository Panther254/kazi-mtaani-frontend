import React, { useState } from "react";
import '../styles/UpdateJob.css'

function UpdateJob() {
	const initialState = {
		position:"",
		jobType:"",
		sector:"",
		availability: false	}

	const [state, setState] = useState(initialState)

	const handleChange =(e)=>{
		const { name, value } = e.target

		if(name === "Available" || name === "Not Available"){
			if(name ==="Available"){
				setState({...state, availability: true})
			}else{
				setState({...state, availability: false})
			}
		}else{
			setState({...state, [name]: value})
		}
	}


	const update = e =>{
		e.preventDefault()
		console.log("Data sent",state)
	}


	return (
		<div className="UpdateJob">
			<form>
				<div className="inputItem">
					<h3>Update Job Details</h3>
				</div>	
				<div className="inputItem">
					<label>Position:</label>
					<input name="position" type="text" value={state.position} onChange={handleChange} />
				</div>

				<div className="inputItem">
					<label>Job type:</label>
					<input name="jobType" type="text" value={state.jobType} onChange={handleChange} />
				</div>

				<div className="inputItem">
					<label>Sector:</label>
					<input name="sector" type="text" value={state.sector} onChange={handleChange} />
				</div>

				<div className="radioContainer">
					<div><input name="Available" type="radio" value="true" onChange={handleChange} checked={state.availability === true}/>Available</div>
					<div><input name="Not Available" type="radio" value="false" onChange={handleChange} checked={state.availability === false}/>Not Available</div>
				</div>

				<div className="inputItem">
					<button onClick={update}>Confirm update</button>
				</div>
			</form>
		</div>
	);
}

export default UpdateJob;

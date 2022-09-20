import React,{ useState } from 'react'
import '../styles/PostAJob.css'

const PostAJob = () => {
	const postJob =()=>{
		alert("Data Sent to Backend")
	}

	return (
		<div className="PostAJob">
			<form action="">
				<div className="jobDetail">
					<label>Position:</label>
					<input type="text"/>
				</div>
				<div className="jobDetail">
					<label>Job Type:</label>
					<input type="text"/>
				</div>
				<div className="jobDetail">
					<label>Sector:</label>
					<input type="text"/>
				</div>
				<div className="jobDetail">
					<label>Location:</label>
					<input type="text"/>
				</div>	
			</form>
			<div className="btnContainer">
				<button className="postButton" onClick={postJob}>Post</button>
				<button className="cancelButton">Cancel</button>
			</div>	
		</div>
	)
}
export default PostAJob
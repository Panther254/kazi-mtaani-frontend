import React from 'react'
import '../styles/Job.css'
import WorkIcon from '@material-ui/icons/Work'
import axios from 'axios'
import Cookies from 'js-cookie'

const Job = ({ position, id, dataPosted, jobType, sector, isAccepted, dataApplied }) => {

	const appyJob = async ()=>{
		const body = {
			id: id,
		}

		const config ={
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json",
				'X-CSRFToken': Cookies.get("csrftoken"),
			}
		}

		await axios.post("http://localhost:8000/jobs/apply-job", body, config)
		.then(res=>{
			console.log('Apply job response', res.data)
		}).catch(error=>{
			alert(error)
		})
	}

	return (
		<div className="job__detailView">
			<div className="job__icon">
				<WorkIcon />
			</div>
			<div className="job__description">
				<p><strong>Sales Assistant- Nairobi</strong></p>
				<p>iRob Technologies</p>
				<p>IT</p>
				<p>Full-Time</p>
				<p>Fintech | IT</p>
				<p>⭐⭐⭐⭐</p>
			</div>
			<div className="job__apply">
				<button onClick={appyJob}>Apply Job</button>
			</div>
		</div>
	)
}

export default Job
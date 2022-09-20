import React, { useState, useEffect } from 'react'
import '../styles/JobSeekerJobsApplied.css'
import Job from './Job'
import axios from 'axios'

const JobSeekerJobsApplied = () => {
	const [jobs, setJobs] = useState([])

	useEffect(() => {
		axios.get('http://localhost:8000/jobs/list-applied-jobs')
		.then(response =>{
			console.log("Jobs Applied:  ", response.data)
			setJobs(response.data)
		})
		.catch(error =>{
			console.log("error fetching jobs applied: ")
		})
		
	}, [])


	return (
		<div className="JobSeekerJobsApplied">
			/*Mapp throuh the jobs array*/
			<Job key="1"/>
			<Job key="2"/>
			<Job key="3"/>
			<Job key="4"/>
		</div>
	)
}

export default JobSeekerJobsApplied
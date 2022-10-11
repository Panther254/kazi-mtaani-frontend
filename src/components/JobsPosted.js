import React, { useState, useEffect } from "react";
import "../styles/JobsPosted.css";
import axios from "axios";


const JobsPosted = ({ handler }) => {
	const initialState = {
		selectedRow: "",
		jobs: [],
	};

	const [state, setState] = useState(initialState);


	const handleClick = (e) => {
		const key = e.currentTarget.id;
		setState({ ...state, selectedRow: "".concat(key) });
		console.log("key",key)
		const clickedJob = state.jobs.find((job) => (job?.id == key))
		console.log('clickedJob', clickedJob)
		handler(prevState=>({ ...prevState,selectedRow: key, selectedJob: clickedJob}))

	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/jobs/list-posted-jobs")
			.then((response) => {
				console.log("Jobs posted:  ", response.data);
				setState(prevState=>({ ...prevState, jobs: response.data }));
			})
			.catch((error) => {
				console.log(error.data.error);
			});
	}, []);

	return (
		<div className="JobsPosted">
			<table>
				<thead>
					<tr>
						<th>Position</th>
						<th>Job Type</th>
						<th>Date Posted</th>
						<th>Sector</th>
						<th>Location</th>
						<th>Available</th>
					</tr>
				</thead>
				{state.jobs.map(job=>(
					<tr
						id={`${job?.id}`}
						className={`${
							state.selectedRow === "".concat(job?.id) ? "selectedRow" : ""
						}`}
						onClick={handleClick}
						key={job?.id}
					>
						<td>{job?.position}</td>
						<td>{job?.job_type}</td>
						<td>{job?.date_posted}</td>
						<td>{job?.sector}</td>
						<td>{job?.location}</td>
						<td>{`${job?.is_available? "Yes":"No"}`}</td>
					</tr>
					))	
				}
			</table>
		</div>
	);
};

export default JobsPosted;

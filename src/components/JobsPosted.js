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
		setState({ ...state, selectedRow: key });
		handler({
			selectedRow: key,
			selectedJob: state.jobs.find((job) => job.id === state.selectedRow)
		})

	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/jobs/list-posted-jobs")
			.then((response) => {
				console.log("Jobs posted:  ", response.data);
				setState({ ...state, jobs: response.data });
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
				<tr
					id="1"
					className={`${
						state.selectedRow === "1" ? "selectedRow" : ""
					}`}
					onClick={handleClick}
				>
					<td>Sales Agent</td>
					<td>Full-Time</td>
					<td>12/02/2019</td>
					<td>Agriculture</td>
					<td>Eldoret</td>
					<td>No</td>
				</tr>
				<tr
					id="2"
					className={`${
						state.selectedRow === "2" ? "selectedRow" : ""
					}`}
					onClick={handleClick}
				>
					<td>Sales Agent</td>
					<td>Full-Time</td>
					<td>12/02/2019</td>
					<td>Agriculture</td>
					<td>Eldoret</td>
					<td>No</td>
				</tr>
				<tr
					id="3"
					className={`${
						state.selectedRow === "3" ? "selectedRow" : ""
					}`}
					onClick={handleClick}
				>
					<td>Sales Agent</td>
					<td>Full-Time</td>
					<td>12/02/2019</td>
					<td>Agriculture</td>
					<td>Eldoret</td>
					<td>No</td>
				</tr>
				<tr
					id="4"
					className={`${
						state.selectedRow === "4" ? "selectedRow" : ""
					}`}
					onClick={handleClick}
				>
					<td>Sales Agent</td>
					<td>Full-Time</td>
					<td>12/02/2019</td>
					<td>Agriculture</td>
					<td>Eldoret</td>
					<td>No</td>
				</tr>
			</table>
		</div>
	);
};

export default JobsPosted;

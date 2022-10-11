import React, { useState } from "react";
import "../styles/UpdateJob.css";
import axios from "axios";
import Cookies from "js-cookie";

function UpdateJob({ jobDetails,handler }) {
	const initialState = {
		id: jobDetails?.id,
		position: jobDetails?.position,
		jobType: jobDetails?.job_type,
		sector: jobDetails?.sector,
		availability: jobDetails?.is_available,
	};

	const [state, setState] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "Available" || name === "Not Available") {
			if (name === "Available") {
				setState({ ...state, availability: true });
			} else {
				setState({ ...state, availability: false });
			}
		} else {
			if (name === "jobType") {
				setState({ ...state, [name]: value.toUpperCase() });
			}
			setState({ ...state, [name]: value });
		}
	};

	const update = async (e) => {
		e.preventDefault();
		console.log("Data sent", state);

		const { id, position, jobType, sector, availability } = state;

		if (
			position !== "" &&
			jobType !== "" &&
			sector !== "" &&
			availability !== ""
		) {
			if (
				jobType.toLowerCase() === "full-time" ||
				jobType.toLowerCase() === "part-time"
			) {
				
				const body = JSON.stringify({
					position: position,
					job_type: jobType.charAt(0).toUpperCase() + jobType.toLowerCase().slice(1),
					sector: sector,
					is_available: availability,
				});

				const config = {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-CSRFToken": Cookies.get("csrftoken"),
					},
				};

				try {
					const res = await axios.patch(
						`http://localhost:8000/jobs/retrieve-update/${id}`,
						body,
						config
					);

					console.log("Respose obejct: ", res);

					if (res.data.error) {
						alert(res.data.error);
					} else {
						console.log(
							"Job Updated successfully from server: ",
							res.data
						);
						handler(prevState=>({ ...prevState,...res.data}))
					}
				} catch (error) {
					console.log("Error: ", error);
				}
			} else {
				alert("The Job Type field should be strictly Full-time or Part-time");
			}
		} else {
			alert("Please fill in all the fields in the form.");
		}
	};

	return (
		<div className="UpdateJob">
			<form>
				<div className="inputItem">
					<h3>Update Job Details</h3>
				</div>
				<div className="inputItem">
					<label>Position:</label>
					<input
						name="position"
						type="text"
						value={state.position}
						onChange={handleChange}
					/>
				</div>

				<div className="inputItem">
					<label>Job type:</label>
					<input
						name="jobType"
						type="text"
						value={state.jobType}
						onChange={handleChange}
						placeholder="Full-time/Part-time"
					/>
				</div>

				<div className="inputItem">
					<label>Sector:</label>
					<input
						name="sector"
						type="text"
						value={state.sector}
						onChange={handleChange}
					/>
				</div>

				<div className="radioContainer">
					<div>
						<input
							name="Available"
							type="radio"
							value="true"
							onChange={handleChange}
							checked={state.availability === true}
						/>
						Available
					</div>
					<div>
						<input
							name="Not Available"
							type="radio"
							value="false"
							onChange={handleChange}
							checked={state.availability === false}
						/>
						Not Available
					</div>
				</div>

				<div className="inputItem">
					<button onClick={update}>Confirm update</button>
				</div>
			</form>
		</div>
	);
}

export default UpdateJob;

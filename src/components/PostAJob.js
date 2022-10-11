import React, { useState } from "react";
import "../styles/PostAJob.css";
import axios from "axios";
import Cookies from "js-cookie";

const PostAJob = () => {
	const initialState = {
		position: "",
		job_type: "Full-time",
		sector: "",
		location: "",
	};
	const [state, setState] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setState({ ...state, [name]: value });
	};

	const postJob = async (e) => {
		e.preventDefault();
		// alert("Data Sent to Backend")
		console.log("state", state);
		if (
			state.position !== "" ||
			state.location !== "" ||
			state.job_type !== "" ||
			state.sector !== ""
		) {
			const config = {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};

			const body = JSON.stringify(state);

			try {
				const response = await axios.post(
					"http://localhost:8000/jobs/post-job",
					body,
					config
				);

				console.log("response from post job: ", response);

				const { status } = response;
				// console.log(status)
				if (status === 200) {
					alert("Error encountered when posting the job.");
				} else if (status === 202) {
					setState({
						position: "",
						job_type: "Full-time",
						sector: "",
						location: ""
					});
				}
			} catch (error) {
				alert(error);
			}
		} else {
			alert("Please fill in all the forms first");
		}
	};

	return (
		<div className="PostAJob">
			<form action="">
				<div className="jobDetail">
					<label>Position:</label>
					<input
						value={state.position}
						name="position"
						onChange={handleChange}
						type="text"
					/>
				</div>
				<div className="jobDetail">
					<label>Job Type:</label>
					<select
						name="job_type"
						id="jobTypes"
						onChange={handleChange}
					>
						<option value="Full-time">Full-time</option>
						<option value="Part-time">Part-time</option>
					</select>
				</div>
				<div className="jobDetail">
					<label>Sector:</label>
					<input
						value={state.sector}
						name="sector"
						onChange={handleChange}
						type="text"
					/>
				</div>
				<div className="jobDetail">
					<label>Location:</label>
					<input
						value={state.location}
						name="location"
						onChange={handleChange}
						type="text"
					/>
				</div>
			</form>
			<div className="btnContainer">
				<button className="postButton" onClick={postJob}>
					Post
				</button>
				<button className="cancelButton">Cancel</button>
			</div>
		</div>
	);
};
export default PostAJob;

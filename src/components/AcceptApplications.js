import React, { useState } from "react";
import "../styles/AcceptApplications.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function AcceptApplications({ jobDetails }) {
	const [slots, setSlots] = useState(0);
	// const { id } = jobDetails;
	const id = 1

	const acceptApplications = async (e) => {
		e.preventDefault()
		if (slots > 0 && slots !== null) {
			const body = JSON.stringify({
				number_of_slots: slots,
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
					`http://localhost:8000/jobs/accept-applications/${id}`,
					body,
					config
				);

				console.log("Respose obejct: ", res);

				if (res.data.error) {
					alert(res.data.error);
				} else {
					console.log(
						"Accepted applications from server: ",
						res.data
					);
				}
			} catch (error) {
				console.log("Error: ", error);
			}
		} else {
			alert("Slots should be greater than zero");
		}
	};

	return (
		<div className="AcceptApplications">
			<h3>Accept Applications</h3>
			<p>Enter the number of slots available for the job posted.</p>
			<form>
				<div className="AcceptApplicationsInputs">
					<label>Number of Slots:</label>
					<input
						type="number"
						value={slots}
						onChange={(e) => setSlots(e.target.value)}
					/>
				</div>

				<button onClick={acceptApplications}>AcceptApplications</button>
			</form>
		</div>
	);
}

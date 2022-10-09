import React, { useState } from "react";
import CSRFToken from "./CSRFToken.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/ForgotPassword.css'

export default function ForgotPassword() {
	const navigate = useNavigate();
	const [state, setState] = useState("");

	const submitForm = async (e) => {
		e.preventDefault();
		if (state !== "") {
			
			const body = JSON.stringify({
				email: state,
			});

			const config = {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};

			try {
				const response = await axios.post(
					'http://localhost:8000/users/reset-password',
					body,
					config
				);
				if (response.data.success) {
					alert(response.data.success);
					navigate("/login");
				} else {
					alert(response.data.error);
				}
				setState("");
			} catch (error) {
				console.log("Something went wrong.Try again later");
				alert(error);
				setState("");
			}
		} else {
			alert("Enter the email");
		}
	};

	return (
		<div className="ForgotPassword">
			<p>
				Please fill in the email that is registered to your account in
				the form below:
			</p>
			<form onSubmit={submitForm}>
				<CSRFToken />
				<div className="forgotPasswordDetails">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						onChange={(e) => setState(e.target.value)}
						value={state}
						required
					/>
				</div>

				<button onClick={submitForm}>Submit</button>
			</form>
		</div>
	);
}

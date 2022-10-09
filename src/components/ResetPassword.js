import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";
import '../styles/ResetPassword.css'

function ResetPassword() {
	const [formVisible, setFormVisible] = useState(false);
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { uidb64, token } = useParams();

	const submit = async (e) => {
		e.preventDefault();

		if (password !== "") {
			const body = JSON.stringify({
				token: token,
				uidb64: uidb64,
				password: password,
			});

			const config = {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};

			try {
				const response = await axios.put(
					'http://localhost:8000/users/reset-password-complete',
					body,
					config
				);
				const { success, error } = response.data;

				if (success) {
					alert(success);
					navigate("/login");
				} else {
					alert(error);
				}
			} catch (error) {
				console.log("Error", error);
			}
		} else {
			alert("Enter the password first");
		}
	};

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/users/reset-password-confirm/${uidb64}/${token}/`
			)
			.then((response) => {
				const { success, error } = response.data;

				if (success) {
					alert(success);
					setFormVisible(true);
				} else {
					alert(error);
				}
			})
			.catch((error) => {
				console.log("Error", error);
			});
	}, []);

	return (
		<div className="ResetPassword">
			{formVisible ? (
				<form onSubmit={submit}>
					<CSRFToken />
					<p>Enter your new password below: </p>
					<div className="resetPasswordDetails">
						<label>New Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button onClick={submit}>Submit</button>
				</form>
			) : (
				<div className="resetPassswordNoForm">
					<p>Waiting for server confirmation</p>
				</div>
			)}
		</div>
	);
}

export default ResetPassword;

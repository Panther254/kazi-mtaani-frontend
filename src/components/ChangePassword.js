import React, { useState } from "react";
import "../styles/ChangePassword.css";
import { actionTypes } from "../reducer";
import { useStateValue } from "../DataStore";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
	const [, dispatch] = useStateValue();
	const navigate = useNavigate();
	const [state, setState] = useState({
		oldPassword: "",
		newPassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const submitForm = async (e) => {
		e.preventDefault();
		if (state.oldPassword !== "" && state.newPassword !== "") {
			const yes = window.confirm(
				"Are you sure you want to change your password?"
			);

			if (yes) {
				const config = {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-CSRFToken": Cookies.get("csrftoken"),
					},
				};

				const body = JSON.stringify({
					old_password: state.oldPassword,
					new_password: state.newPassword,
				});

				try {
					const res = await axios.put(
						"http://localhost:8000/users/change-password",
						body,
						config
					);
					console.log("res", res);
					const { success, error, new_password } = res.data;

					if (success) {
						alert(success);
						dispatch({
							type: actionTypes.LOGOUT_SUCCESS,
						});
						navigate("/login");
					} else if (error) {
						alert(error);
					} else {
						let error = "";
						new_password.forEach((log) => {
							error = error.concat(log).concat("\n");
						});
						alert(error.trim());
					}
				} catch (error) {
					console.log("Change password view error: ", error);
				}
				setState({
					oldPassword: "",
					newPassword: "",
				});
			}
		} else {
			alert("Please fill all the fields");
		}
	};

	return (
		<div className="changePassword">
			<form>
				<div className="inputItem">
					<label>Old Password:</label>
					<input
						type="password"
						name="oldPassword"
						value={state.oldPassword}
						onChange={handleChange}
						autoComplete="new-password"
					/>
				</div>

				<div className="inputItem">
					<label>New Password:</label>
					<input
						type="password"
						name="newPassword"
						value={state.newPassword}
						onChange={handleChange}
					/>
				</div>

				<div className="inputItem">
					<button onClick={submitForm}>Change password</button>
				</div>
			</form>
		</div>
	);
}

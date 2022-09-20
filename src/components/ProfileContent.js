import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/ProfileContent.css";
import Cookies from "js-cookie";
import { useStateValue } from '../DataStore'
import { actionTypes } from '../reducer'

function ProfileContent({ profile }) {
	const [ , dispatch] = useStateValue();
	const initialState = {
		username: "",
		email: "",
		phoneNumber: "",
		residence: "",
		editable: false,
		reset: false,
	};

	const [state, setState] = useState(initialState);

	const updateProfile = (e) => {
		setState({ ...state, editable: true });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const confirmUpdate = async (e) => {
		const yes = window.confirm(
			"You Are About To Change Your Details, Are You Sure?"
		);
		if (yes) {

			alert("Data Sent To Backend For Processing,Please Wait");
			
			const names = state.username.split(" ");
			
			let lastName = "";
			
			names.forEach((name) => {
				lastName = lastName.concat(name).concat(" ");
			});

			lastName.trim();

			const body = JSON.stringify({
				first_name: names[0],
				last_name: lastName,
				phone_number: state.phoneNumber,
				residence: state.residence,
				email: state.email,
			});

			const config = {
				headers: {
					'Accept': "application/json",
					'Content-Type': "application/json",
					'X-CSRFToken': Cookies.get("csrftoken"),
				},
			};
			
			const res = await axios.patch(
				"http://localhost:8000/users/profile",
				body,
				config
			);

			console.log("Respose obejct: ",res)

			if (res.data.error) {
				alert(res.data.error)
			} else {
				console.log("Update profile Data from server: ", res.data)
				// dispatch({
				// 	type: actionTypes.PROFILEUPDATE_SUCCESS,
				// 	payload: res.data
				// })

			}
		}
	};

	useEffect(() => {
		const { first_name, last_name, email, phone_number, residence } =
			profile;

		const initialState1 = {
			username: `${first_name} ${last_name}`,
			email: email,
			phoneNumber: phone_number,
			residence: residence,
			editable: false,
		};

		setState(initialState1);
	}, [state.reset,profile]);

	return (
		<div className="JobSeekerProfile">
			<form action="">
				<div className="jobSeekerDetails">
					<label>Full Name:</label>
					<input
						type="text"
						name="username"
						value={state.username}
						onChange={handleChange}
						{...{ disabled: `${state.editable ? "" : "true"}` }}
					/>
				</div>

				<div className="jobSeekerDetails">
					<label>Email:</label>
					<input
						type="text"
						name="email"
						value={state.email}
						onChange={handleChange}
						{...{ disabled: `${state.editable ? "" : "true"}` }}
					/>
				</div>

				<div className="jobSeekerDetails">
					<label>Phone Number:</label>
					<input
						type="text"
						name="phoneNumber"
						value={state.phoneNumber}
						onChange={handleChange}
						{...{ disabled: `${state.editable ? "" : "true"}` }}
					/>
				</div>

				<div className="jobSeekerDetails">
					<label>Residence:</label>
					<input
						type="text"
						name="residence"
						value={state.residence}
						onChange={handleChange}
						{...{ disabled: `${state.editable ? "" : "true"}` }}
					/>
				</div>
			</form>

			<div className="buttonContainer">
				{state.editable ? (
					<button className="btn" onClick={confirmUpdate}>
						Confirm
					</button>
				) : (
					<button className="btn" onClick={updateProfile}>
						Update
					</button>
				)}
				{!state.editable ? (
					""
				) : (
					<button
						className="btn cancelBtn"
						onClick={() =>
							setState({ ...state, editable: false, reset: true })
						}
					>
						Cancel
					</button>
				)}
			</div>
		</div>
	);
}

export default ProfileContent;

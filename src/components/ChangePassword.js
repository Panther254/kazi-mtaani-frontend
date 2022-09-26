import React, { useState } from "react";
import "../styles/ChangePassword.css";
import CSRFToken from "./CSRFToken";

export default function ChangePassword() {
	const [state, setState] = useState({
		oldPassword: "",
		newPassword: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const submitForm = async (e) => {
		e.preventDefault();
		if((state.oldPassword !=="") && (state.newPassword !=="")){
			const yes = window.confirm("Are you sure you want to change your password?");

			if (yes) {
				console.log("data sent to server");
				// const config = {
				// 	headers: {
				// 		Accept: "application/json",
				// 		"Content-Type": "application/json",
				// 		"X-CSRFToken": Cookies.get("csrftoken"),
				// 	},
				// };

				// const body = JSON.stringify({
				// 	old_password: state.oldPassword,
				// 	new_password: state.newPassword
				// });

				// try{
				// 	const res = await axios.post("http://localhost:8000/users/change-password",body,config)
				// 	const { data,message } = res

				// 	if(data.status === 'success'){
				// 		alert(message)
				// 	}

				// }catch(error){
				// 	console.log("Change password view error: ",error.reponse.data.error)
				// }
				// setState({
				// 	oldPassword: "",
				// 	newPassword: "",
				// });
			}
		}else{
			alert("Please fill all the fields")
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

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { useStateValue } from "../DataStore";
import { actionTypes } from "../reducer";
import axios from "axios";
import Cookies from "js-cookie";

const NavBar = () => {
	const navigate = useNavigate();
	const [{ isAuthenticated }, dispatch] = useStateValue();

	

	const logOut = async (e) => {
		const yes = window.confirm("Are you sure you want to log out?");

		if (yes) {
			const config = {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};

			const body = JSON.stringify({
				data: "logout",
			});

			try {
				const res = await axios.post(
					'http://localhost:8000/users/logout',
					body,
					config
				);

				const { success, error } = res.data;

				if (success) {
					alert(success);
					dispatch({
						type: actionTypes.LOGOUT_SUCCESS,
					});
					navigate("/")
				} else {
					alert(error);
				}
			} catch (error) {
				// alert("Something went wrong. Failed to log out");
				alert(error)
			}
		}
	};

	const validate = () => {
		if (!isAuthenticated) {
			alert("You Need to be Signed in First");
			navigate("/login");
		} else {
			navigate("/profile");
		}
	};

	return (
		<div className="NavBar">
			<div className="navbar__hamburgerIcon">
				<MenuIcon />
			</div>
			<div className="navbar__logo"></div>
			<div className="navbar__auth">
				{isAuthenticated ? (
					<h5 onClick={logOut}>Sign Out</h5>
				) : (
					<h5 onClick={() => navigate("/login")}>Sign In</h5>
				)}
			</div>
			<div className="navbar__profile">
				<h5 onClick={validate}>Profile</h5>
			</div>
		</div>
	);
};

export default NavBar;

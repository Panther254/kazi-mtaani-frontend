import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { useStateValue } from "../DataStore";
import { actionTypes } from "../reducer";

const NavBar = () => {
	const navigate = useNavigate();
	const [{ user }, dispatch] = useStateValue();

	const postJob = () => {
		if (!user) {
			alert("You Need To Sign in First");
		} else {
			navigate("/profile");
		}
	};

	const logOut = () => {
		console.log("You have logged out");
	};

	const validate = () => {
		if (!user) {
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
				{user ? (
					<h5 onClick={logOut}>Sign Out</h5>
				) : (
					<h5 onClick={() => navigate("/login")}>Sign In</h5>
				)}
			</div>
			<div className="navbar__profile">
				<h5 onClick={validate}>Profile</h5>
			</div>
			{user ? (
				<div className="navbar__postJob">
					<button onClick={postJob} className="link">
						Post Job
					</button>
				</div>
			) : null}
		</div>
	);
};

export default NavBar;

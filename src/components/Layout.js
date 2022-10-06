import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../DataStore.js";
import { actionTypes } from '../reducer'

function Layout({ children }) {
	const [, dispatch] = useStateValue();

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:8000/users/authenticated")
			.then((response) => {
				const { is_authenticated } = response.data;

				if (is_authenticated) {
					axios
						.get("http://localhost:8000/users/profile")
						.then((res) => {
							console.log("user profile", res.data);
							dispatch({
								type: actionTypes.USER_LOADED_SUCCESS,
								payload: {
									isAuthenticated: true,
									profile: res.data,
								},
							});
						})
						.catch((error) => {
							console.log(error);
							alert("Something went wrong. Try again");
						});
					navigate('/')
				} else {
					dispatch({
						type: actionTypes.USER_LOADED_FAIL,
					});
					navigate("/login");
				}
			})
			.catch((error) => {
				alert(error);
				navigate("/login");
			});
	}, []);
	return <>{children}</>;
}

export default Layout;

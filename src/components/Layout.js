import React, { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useStateValue } from "../DataStore.js";
import { actionTypes } from "../reducer";

function Layout() {
	const [{isAuthenticated}, dispatch] = useStateValue();

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
				} else {
					dispatch({
						type: actionTypes.USER_LOADED_FAIL,
					});
				}
			})
			.catch((error) => {
				dispatch({
					type: actionTypes.USER_LOADED_FAIL,
				});
			});
	}, [isAuthenticated, dispatch]);
	return <Outlet />;
}

export default Layout;

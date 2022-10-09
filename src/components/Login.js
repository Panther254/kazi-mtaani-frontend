import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "../styles/Login.css";
// import { Icon } from "@iconify/react";
import { useStateValue } from "../DataStore";
import { actionTypes } from "../reducer";
import CSRFToken from "./CSRFToken";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{ isAuthenticated }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            password: password,
            email: email,
        });

        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        };

        try {
            const res = await axios.post(
                "http://localhost:8000/users/login",
                body,
                config
            );

            console.log("Respose obejct: ", res);

            if (res.data.error) {
                alert(res.data.error);
            } else if (res.data.success) {
                console.log(
                    "Login successfully from server: ",
                    res.data.success
                );
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                });
                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (error) {
            alert(error);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="Login">
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <div className="login__container">
                    <div className="illustrator__container"></div>
                    <div className="login__details">
                        <div className="login__prompt">
                            <p> Don 't Have An Account?</p>
                            <button onClick={() => navigate("../signUp")}>
                                Sign Up
                            </button>
                        </div>
                        <h3> Welcome To Jobs - Hub </h3> <h4> Sign In </h4>
                        <form onSubmit={signIn}>
                            <CSRFToken />
                            <label> Email: </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />{" "}
                            <label> Password: </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                        <button onClick={signIn}> Sign In </button>
                        <p>
                            Forgot password ?{" "}
                            <Link to="/forgot-password">click here</Link>{" "}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;

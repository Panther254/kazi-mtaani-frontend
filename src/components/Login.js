import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
// import { Icon } from "@iconify/react";
import { useStateValue } from "../DataStore";
// import { actionTypes } from "../reducer";
import CSRFToken from './CSRFToken'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, dispatch] = useStateValue();
    const navigate = useNavigate();

    const signIn = () => {
        alert("Data Sent To Backend");
        navigate('/profile')
    };

    return (
        <div className="Login">
            <div className="login__container">
                <div className="illustrator__container"></div>{" "}
                <div className="login__details">
                    <div className="login__prompt">
                        <p> Don 't Have An Account?</p>{" "}
                        <button onClick={() => navigate("../signUp")}> Sign Up </button>{" "}
                    </div>{" "}
                    <h3> Welcome To Jobs - Hub </h3> <h4> Sign In </h4>
                    <form onSubmit={signIn}>
                        <CSRFToken />  
                        <label> Email: </label>{" "}
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />{" "}
                        <label> Password: </label>{" "}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />{" "}
                    </form>
                    <button onClick={signIn}> Sign In </button>
                </div>{" "}
            </div>{" "}
        </div>
    );
}

export default Login;

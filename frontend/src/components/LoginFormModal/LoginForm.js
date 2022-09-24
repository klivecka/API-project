// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser && Object.keys(sessionUser).length !== 0)
        return setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                setErrors([data.message]);
            }
        );
    };

    return (
        

        <div className="login-wrapper">
            <div className="login-text-wrapper">
            <div id="m-logo-login"></div>
                <div id="login">Log in</div>
                <div id="notmember">
                    Not a member yet?{" "}
                    <NavLink id="signup-link"to="/signup" onClick={() => setShowModal(false)}>
                        Sign up
                    </NavLink>
                </div>
            </div>

            <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className="login-form-label">
                    Username or Email
                    <input
                        className="login-input"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className="login-form-label">
                    Password
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className="login-button-div">
                <button type="submit">Log In</button>
                </div>
                <div className="login-button-div">
                <button type="submit" id="demo-user-button">Demo User</button>
                </div>
            </form>
            </div>
        </div>

    );
}

export default LoginForm;

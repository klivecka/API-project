// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    console.log('THESE ARE THE ERRORS', errors)

      if (sessionUser && Object.keys(sessionUser).length !== 0) return (
        setShowModal(false)
      );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                console.log('THIS IS THE DATA IN THE LOGIN', data.message)
                setErrors([data.message]);
            }
        );
    };

    return (
        <div className="login-wrapper">
            <div>Log in</div>
            <div>
                Not a member yet?{" "}
                <NavLink to="/signup" onClick={() => setShowModal(false)}>
                    Sign up
                </NavLink>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Username or Email
                    <input
                        className="login-input"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;

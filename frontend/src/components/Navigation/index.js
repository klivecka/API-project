import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";
import SignupForm from "../SignupForm/SignupForm";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser && Object.keys(sessionUser).length !== 0) {
        sessionLinks = (
            <>
                <NavLink id="create-group-navlink" to="/group/create">
                    Create a Group
                </NavLink>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">
                    {" "}
                    <button
                    className="nav-signup-button"
                    >Sign Up</button>
                </NavLink>
            </>
        );
    }

    return (
        <div className="header-nav-wrapper">
            <Link to="/" className="meetup-logo">
                <div className="meetup-logo"></div>
            </Link>
            <div className="nav-link-wrapper">{isLoaded && sessionLinks}</div>
        </div>
    );
}

export default Navigation;

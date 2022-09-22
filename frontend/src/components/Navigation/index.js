import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";
import SignupForm from "../SignupForm/SignupForm";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('THIS IS SESSIONUSER',sessionUser)

    let sessionLinks;
    if (sessionUser && Object.keys(sessionUser).length !== 0) {
        sessionLinks = 
        <>
        <ProfileButton user={sessionUser} />
        <NavLink to="/group/create">Create a Group</NavLink>
        </>
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to='/signup'> <button>Sign Up</button></NavLink>
            </>
        );
    }

    return (
        <div className="header-nav-wrapper">
            <div className="meetup-logo"></div>
            <div className="nav-link-wrapper">{isLoaded && sessionLinks}</div>
        </div>
    );
}

export default Navigation;

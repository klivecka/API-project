import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    //   if (sessionUser) {
    //     sessionLinks = (
    //       <ProfileButton user={sessionUser} />
    //     );
    //   } else {
    //     sessionLinks = (
    //       <>
    //         <NavLink to="/login">Log In</NavLink>
    //         <NavLink to="/signup">Sign Up</NavLink>
    //       </>
    //     );
    //   }

    sessionLinks = (
        <>
            <NavLink className="nav-link" to="/login">
                Log In
            </NavLink>
            <NavLink className="nav-link" to="/signup">
                Sign Up
            </NavLink>
            <ProfileButton className="nav-link" user={sessionUser} />
        </>
    );

    return (
        <div className="header-nav-wrapper">
            <div className="meetup-logo">Meetup</div>
            <div className="nav-link-wrapper">
                <NavLink className="nav-link" exact to="/">
                    Home
                </NavLink>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;

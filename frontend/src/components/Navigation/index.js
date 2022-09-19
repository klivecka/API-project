import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('THIS IS SESSIONUSER',sessionUser)

    let sessionLinks;
      if (sessionUser && Object.keys(sessionUser).length !== 0) {
        sessionLinks = (
          <ProfileButton user={sessionUser} />
        );
      } else {
        sessionLinks = (
          <>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        );
      }

    // sessionLinks = (
    //     <>
    //         <NavLink className="nav-link" to="/login">
    //             Log In
    //         </NavLink>
    //         <NavLink className="nav-link" to="/signup">
    //             Sign Up
    //         </NavLink>
    //         <ProfileButton className="nav-link" user={sessionUser} />
    //     </>
    // );

    return (
        <div className="header-nav-wrapper">
            <div className="meetup-logo">Meetup</div>
            <div className="nav-link-wrapper">
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;

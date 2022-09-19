import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./mainpage.css"

const MainPageNav = () => {
    return (
        <div className="main-page-nav-wrapper">
            <NavLink className="main-page-nav-link" to="/groups">
                Groups
            </NavLink>
            <NavLink className="main-page-nav-link" to="/events">
                Events
            </NavLink>
        </div>
    );
};

export default MainPageNav
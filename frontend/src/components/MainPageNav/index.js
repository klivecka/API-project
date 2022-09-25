import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./mainpage.css";

const MainPageNav = () => {
    let clickState;
    if (
        window.location.pathname === "/groups" ||
        window.location.pathname === "/groups/"
    ) {
        clickState = "groups";
    }
    if (
        window.location.pathname === "/events" ||
        window.location.pathname === "/events/"
    ) {
        clickState = "events";
    }
    return (
        <>
        <div className="main-nav-align-wrap">
            <div className="main-page-nav-wrapper">
                <NavLink
                    className="main-page-nav-link"
                    to="/groups"
                    style={{
                        color: clickState === "groups" ? "#0b7880" : "gray",
                        borderBottom:
                            clickState === "groups" ? "3px #0b7880 solid" : "3px white solid",
                    }}
                >
                    Groups
                </NavLink>
                <NavLink
                    className="main-page-nav-link"
                    to="/events"
                    style={{
                        color: clickState === "events" ? "#0b7880" : "gray",
                        borderBottom:
                            clickState === "events" ? "3px #0b7880 solid" : "3px white solid",
                    }}
                >
                    Events
                </NavLink>
            </div>
            </div>
        </>
    );
};

export default MainPageNav;

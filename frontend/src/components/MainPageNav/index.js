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
            <div className="main-page-nav-wrapper">
                <NavLink
                    className="main-page-nav-link"
                    to="/groups"
                    style={{
                        color: clickState === "groups" ? "green" : "gray",
                        textDecoration:
                            clickState === "groups" ? "underline" : "none",
                    }}
                >
                    Groups
                </NavLink>
                <NavLink
                    className="main-page-nav-link"
                    to="/events"
                    style={{
                        color: clickState === "events" ? "green" : "gray",
                        textDecoration:
                            clickState === "events" ? "underline" : "none",
                    }}
                >
                    Events
                </NavLink>
            </div>
        </>
    );
};

export default MainPageNav;

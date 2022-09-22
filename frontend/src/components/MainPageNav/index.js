import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./mainpage.css";

const MainPageNav = () => {
    const [clickState, setClickState] = useState("");
    console.log("THIS IS MAIN PAGE NAV CLICK STATE", clickState);
    return (
        <>
            <div className="main-page-nav-wrapper">
                <NavLink
                    className="main-page-nav-link"
                    to="/groups"
                    setClickState={setClickState}
                    onClick={(e) => setClickState("groups")}
                    style={{
                        color: clickState === "groups" ? "green" : "gray",
                        textDecoration: clickState === "groups" ? "underline" : "none"
                    }}
                >
                    Groups
                </NavLink>
                <NavLink
                    className="main-page-nav-link"
                    to="/events"
                    onClick={(e) => setClickState("events")}
                    style={{
                        color: clickState === "events" ? "green" : "gray",
                        textDecoration: clickState === "events" ? "underline" : "none"
                    }}
                >
                    Events
                </NavLink>
            </div>
        </>
    );
};

export default MainPageNav;

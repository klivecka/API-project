import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, NavLink } from "react-router-dom";
import { fetchOneGroup } from "../../store/group";
import "./groupdetails.css";
import { EventList } from "../EventList";

export const GroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group[groupId]);
    const [linkValue, setLinkValue] = useState("about");
    console.log('THIS IS LINK VALUE', linkValue)
    useEffect(() => {
        dispatch(fetchOneGroup(groupId));
        // console.log('THIS IS THE USE EFFECT RUNNING')
    }, [fetchOneGroup]);

    return (
        <>
            {group && (
                <div className="outer-wrapper">
                    <div className="group-detail-image">group image</div>
                    <div className="group-detail-text-wrapper">
                        <div className="group-detail-title">{group.name}</div>
                        <div className="group-detail-location">
                            {group.city}, {group.state}{" "}
                        </div>
                        <div className="group-detail-members">
                            {group.numMembers}
                            {group.numMembers > 1 && " members"}
                            {group.numMembers === 0 && " members"}
                            {group.numMembers === 1 && " member"} ·{" "}
                            {group.private === true && "Private group"}
                            {group.private === false && "Public group"}
                        </div>
                        <div className="group-details-organized">
                            Organized by {group.Organizer.firstName}{" "}
                            {group.Organizer.lastName}
                        </div>
                    </div>
                    <div className="group-details-nav-bar">
                        <div
                            className="detail-nav-link"
                            onClick={(e) => setLinkValue("about")}
                        >
                            About
                        </div>
                        <div
                            className="detail-nav-link"
                            onClick={(e) => setLinkValue("events")}
                        >
                            Events
                        </div>
                        <div
                            className="detail-nav-link"
                            onClick={(e) => setLinkValue("members")}
                        >
                            Members
                        </div>
                        <div
                            className="detail-nav-link"
                            onClick={(e) => setLinkValue("photos")}
                        >
                            Photos
                        </div>
                    </div>
                    <div className="group-details-nav-click">
                        {linkValue === "about" && group.about}
                        {linkValue === "events" && <EventList/>}
                        {linkValue === "members" && "members TBD"}
                        {linkValue === "photos" && group.GroupImages[0].url}
                    </div>
                </div>
            )}
        </>
    );
};

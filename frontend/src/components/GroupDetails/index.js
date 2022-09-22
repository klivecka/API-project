import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, NavLink } from "react-router-dom";
import { fetchGroups, fetchOneGroup } from "../../store/group";
import "./groupdetails.css";
import { EventList } from "../EventList";

export const GroupDetails = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const [linkValue, setLinkValue] = useState("about");
    const [isLoaded, setIsLoaded] = useState(false);
    const group = useSelector(state => state.group.GroupDetails[groupId])
    // const groupImgUrl = group.GroupImages[0].url
    console.log('THIS IS THE GROUP', group)
    useEffect( () => {
        dispatch(fetchOneGroup(groupId)).then(() => setIsLoaded(true));
    }, [groupId]);

    return (
        <><div>test</div>
            {/* {isLoaded && (
                <div className="outer-wrapper">
                    <div
                        className="group-detail-image"
                        style={{
                            backgroundImage: groupImgUrl
                                ? `url(${groupImgUrl})`
                                : `url(
                                      "https://i.ibb.co/4tMJkBY/group-default.png"
                                  )`,
                        }}
                    ></div>
                    <div className="group-detail-text-wrapper">
                        <div className="group-detail-title">{group.name}</div>
                        <div className="group-detail-location">
                            <i class="fa-solid fa-location-dot"></i>
                            {"    "}
                            {group.city}, {group.state}{" "}
                        </div>
                        <div className="group-detail-members">
                            <i className="fa-solid fa-users"></i>
                            {"    "}
                            {group.numMembers}
                            {group.numMembers > 1 && " members"}
                            {group.numMembers === 0 && " members"}
                            {group.numMembers === 1 && " member"} ·{" "}
                            {group.private === true && "Private group"}
                            {group.private === false && "Public group"}
                        </div>
                        <div className="group-details-organized">
                            <i class="fa-solid fa-user"></i>
                            {"    "}
                            Organized by {group.Organizer.firstName}{" "}
                            {group.Organizer.lastName}
                        </div>
                        <div className="join-group-div">
                            <button id="join-button">Edit this group</button>
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
                        {linkValue === "events" && <EventList />}
                        {linkValue === "members" && "members TBD"}
                        {linkValue === "photos" && group.GroupImages[0].url}
                    </div>
                </div>
            )} */}
        </> 
    );
};

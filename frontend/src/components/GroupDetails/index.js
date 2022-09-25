import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Redirect,
    useParams,
    NavLink,
    Link,
    useHistory,
} from "react-router-dom";
import { deleteGroup, fetchGroups, fetchOneGroup } from "../../store/group";
import "./groupdetails.css";
import { EventList } from "../EventList";

export const GroupDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const [linkValue, setLinkValue] = useState("about");
    const [isLoaded, setIsLoaded] = useState(false);
    const group = useSelector((state) => state.group.GroupDetails);
    const userId = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(fetchOneGroup(groupId)).then(() => setIsLoaded(true));
    }, [fetchOneGroup]);

    const deleteSubmit = (groupId) => {
        dispatch(deleteGroup(groupId));
        alert("Successfully Deleted");
        history.push("/groups");
    };

    return (
        <>
            <div className="group-details-wrapper">
                {isLoaded && (
                    <div className="outer-wrapper">
                        <div
                            className="group-detail-image"
                            style={{
                                backgroundImage: group.GroupImages.length
                                    ? `url(${group.GroupImages[0].url})`
                                    : `url("https://i.ibb.co/4tMJkBY/group-default.png")`,
                            }}
                        ></div>
                        <div className="group-detail-text-wrapper">
                            <div className="group-detail-title">
                                {group.name}
                            </div>
                            <div className="group-detail-location">
                                <i className="fa-solid fa-location-dot"></i>
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
                                <i className="fa-solid fa-user"></i>
                                {"    "}
                                Organized by {group.Organizer.firstName}{" "}
                                {group.Organizer.lastName}
                            </div>
                            {userId === group.organizerId && (
                                <>
                                    <div className="join-group-div">
                                        <Link to={`/groups/edit/${groupId}`}>
                                            <button id="function-button">
                                                Edit this group
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="create-event-div">
                                        <Link to={`/groups/${groupId}/event`}>
                                            <button id="function-button">
                                                Add an event
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="delete-group-div">
                                        <button
                                            id="function-button"
                                            onClick={(e) =>
                                                deleteSubmit(groupId)
                                            }
                                        >
                                            Delete this group
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="group-details-nav-bar">
                            <div
                                className="detail-nav-link"
                                onClick={(e) => setLinkValue("about")}
                                style={{
                                    color:
                                        linkValue === "about"
                                            ? "#0b7880"
                                            : "black",
                                    fontWeight:
                                        linkValue === "about" ? "bold" : "400",
                                }}
                            >
                                About
                            </div>
                            <div
                                className="detail-nav-link"
                                onClick={(e) => setLinkValue("events")}
                                style={{
                                    color:
                                        linkValue === "events"
                                            ? "#0b7880"
                                            : "black",
                                    fontWeight:
                                        linkValue === "events" ? "bold" : "400",
                                }}
                            >
                                Events
                            </div>
                            {/* <div
                                className="detail-nav-link"
                                onClick={(e) => setLinkValue("members")}
                                style={{
                                    color:
                                        linkValue === "members"
                                            ? "#0b7880"
                                            : "black",
                                    fontWeight:
                                        linkValue === "members"
                                            ? "bold"
                                            : "400",
                                }}
                            >
                                Members
                            </div> */}
                            {/* <div
                                className="detail-nav-link"
                                onClick={(e) => setLinkValue("photos")}
                                style={{
                                    color:
                                        linkValue === "photos"
                                            ? "#0b7880"
                                            : "black",
                                    fontWeight:
                                        linkValue === "photos" ? "bold" : "400",
                                }}
                            >
                                Photos
                            </div> */}
                        </div>
                        {linkValue === "about" && (
                            <h2 className="about-text">What we're about</h2>
                        )}
                        <div className="group-details-nav-click">
                            {linkValue === "about" && group.about}
                            {linkValue === "events" && <EventList />}
                            {linkValue === "members" && "members TBD"}
                            {linkValue === "photos" && group.GroupImages[0].url}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

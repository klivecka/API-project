import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, NavLink } from "react-router-dom";
import { fetchEvents } from "../../store/event";
import { fetchOneGroup } from "../../store/group";
import "./eventdetails.css";

const EventDetails = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector((state) => state.event[eventId]);
    const [isLoaded, setIsLoaded] = useState(false);
    console.log("THIS IS THE EVENT", event);

    const date = new Date(event.startDate);
    const newDate = date.toString();
    const dateParse = newDate.split(" ");
    const hour = dateParse[4].split(":")[0];
    const minute = dateParse[4].split(":")[0];
    let m = hour > 12 ? "PM" : "AM";
    const dateString = `${dateParse[0]}, ${dateParse[1]} ${dateParse[2]} · ${
        hour % 12
    }:${minute} ${m}`;
    event.newDate = dateString;

    const group = useSelector((state) => state.group.GroupDetails);
    let groupType;

    useEffect(() => {
        dispatch(fetchEvents()).then(() => setIsLoaded(true));
        dispatch(fetchOneGroup(event.Group.id));
    }, []);

    return (
        <>
            {isLoaded && (
                <div className="event-details-wrapper">
                    <div className="upper-color-section"></div>
                    <div className="lower-color-section"></div>
                    <div className="outer-wrapper">
                        <div
                            className="event-detail-image"
                            style={{
                                backgroundImage: `url(${event.previewImage})`,
                            }}
                        ></div>
                        <div className="event-detail-text-wrapper">
                            <div className="event-detail-title">
                                {event.name}
                            </div>

                            <div className="event-detail-attendance">
                                {event.numAttending}{" "}
                                {event.numAttending > 1 && " attendees"}
                                {event.numAttending === 0 && " attendees"}
                                {event.numAttending === 1 && "attendee"}
                            </div>
                        </div>
                        <div className="mid-right-wrapper">
                            <div className="event-detail-group">
                                <div
                                    className="tiny-group-img"
                                    style={{
                                        backgroundImage: group.GroupImages
                                            .length
                                            ? `url(${group.GroupImages[0].url})`
                                            : `url("https://i.ibb.co/4tMJkBY/group-default.png")`,
                                    }}
                                ></div>
                                <div className="event-group-details">
                                    {group.name} <br></br>
                                    {group.private && "Private group"}
                                    {!group.private && "Public group"}
                                </div>
                            </div>
                            <div className="event-detail-date">
                                <i className="fa-regular fa-clock"></i>
                                {" "}
                                {event.newDate}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventDetails;

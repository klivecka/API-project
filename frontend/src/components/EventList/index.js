import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchEvents } from "../../store/event";
import { fetchGroups } from "../../store/group";
import "./eventlist.css";

export const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.list);
    // console.log("THESE ARE THE EVENTS IN THE LIST", events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [fetchEvents]);

    return (
        <div className="event-alignment-wrapper">
            <div className="event-wrapper">
                {events.map((event) => (
                    <Link
                        style={{ textDecoration: "none" }}
                        to={`/events/${event.id}`}
                    >
                        <div key={event.id} className="event-div">
                            <div className="event-image">
                            style={{
                                    backgroundImage:
                                        event.previewImage !== "no image"
                                            ? `url(${event.previewImage})`
                                            : `url("https://i.ibb.co/4tMJkBY/group-default.png")`,
                                }}
                            </div>
                            <div className="event-date">{event.startDate}</div>
                            <div className="event-title">{event.name}</div>
                            <div className="event-group-city">
                                {event.Group.name} · {event.Group.city},{" "}
                                {event.Group.state}
                            </div>
                            <div className="event-attendance">
                                {event.numAttending}{" "}
                                {event.numAttending > 1 && " attendees"}
                                {event.numAttending === 0 && " attendees"}
                                {event.numAttending === 1 && "attendee"}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

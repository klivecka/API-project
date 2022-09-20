import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, NavLink } from "react-router-dom";
import { fetchOneEvent } from "../../store/event";
import "./eventdetails.css";

const EventDetails = () => {
    const dispatch = useDispatch();
    const {eventId} = useParams();
    const event = useSelector((state) => state.event[eventId]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchOneEvent(eventId)).then(() => setIsLoaded(true));
    }, [eventId]);

    return (
        <>
            {isLoaded && (
                <div className="outer-wrapper">
                    <div className="event-detail-image">event image</div>
                    <div className="event-detail-text-wrapper">
                        <div className="event-date">{event.startDate}</div>
                        <div className="event-title">{event.name}</div>
                        <div className="event-group">{event.Group.name}</div>
                        <div className="event-attendance">
                            {event.numAttending}{" "}
                            {event.numAttending > 1 && " attendees"}
                            {event.numAttending === 0 && " attendees"}
                            {event.numAttending === 1 && "attendee"}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default EventDetails
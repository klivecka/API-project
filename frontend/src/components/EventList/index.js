import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchEvents } from "../../store/event";
import { fetchGroups } from "../../store/group";
import "./eventlist.css";

export const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.list);
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log("THESE ARE THE EVENTS IN THE LIST", events);

    const newDates = events.map((event) => {
        const date = new Date(event.startDate);
        const newDate = date.toString();
        const dateParse = newDate.split(" ");
        const hour = dateParse[4].split(":")[0];
        const minute = dateParse[4].split(":")[0];
        let m = hour > 12 ? "PM" : "AM";
        const dateString = `${dateParse[0]}, ${dateParse[1]} ${
            dateParse[2]
        } · ${hour % 12}:${minute} ${m}`;
        return (event.newDate = dateString);
    });
    console.log("these are the new dates", newDates);

    useEffect(() => {
        dispatch(fetchEvents()).then(()=> dispatch(fetchGroups())).then(() => setIsLoaded(true));
    }, [fetchEvents]);

    return (
        <>
            {isLoaded && (
                <div className="event-alignment-wrapper">
                    <div className="event-wrapper">
                        {events.map((event) => (
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`/events/${event.id}`}
                            >
                                <div key={event.id} className="event-div">
                                    <div
                                        className="event-image"
                                        style={{
                                            backgroundImage:
                                                event.previewImage !==
                                                null
                                                    ? `url(${event.previewImage})`
                                                    : `url("https://i.ibb.co/4tMJkBY/group-default.png")`,
                                        }}
                                    ></div>
                                    <div className="event-date">
                                        {event.newDate}
                                    </div>
                                    <div className="event-title">
                                        {event.name}
                                    </div>
                                    <div className="event-group-city">
                                        {event.Group.name} · {event.Group.city},{" "}
                                        {event.Group.state}
                                    </div>
                                    <div className="event-attendance">
                                        {event.numAttending}{" "}
                                        {event.numAttending > 1 && " attendees"}
                                        {event.numAttending === 0 &&
                                            " attendees"}
                                        {event.numAttending === 1 && "attendee"}
                                        {" · "}
                                        {event.type}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchGroups } from "../../store/group";
import "../MainPageNav/mainpage.css";

export const GroupList = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.group.list);

    console.log("THIS THE THE GROUPS FROM STATE", groups);

    useEffect(() => {
        dispatch(fetchGroups());
        // console.log('THIS IS THE USE EFFECT RUNNING')
    }, [fetchGroups]);

    return (
        <div className="group-wrapper">
            <ul>
                {groups.map((group) => (
                    <div className="group-div" key={group.id}>
                        <div className="internal-image">
                            group image
                        </div>
                        <div className="group-title">
                            <h3>{group.name}</h3>
                        </div>
                        <div className="group-city-state">
                            <h3>
                                {group.city}, {group.state}
                            </h3>
                        </div>
                        <div className="group-about">
                            <p>{group.about}</p>
                        </div>

                        <div className="group-members">
                            {group.numMembers} members ·{" "}
                            {group.private && "private"}{" "}
                            {!group.private && "public"}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

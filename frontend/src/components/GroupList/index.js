import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchGroups } from "../../store/group";
import "../MainPage/mainpage.css";

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
                        <h3>{group.name}</h3>
                        <h3>
                            {group.city}, {group.state}
                        </h3>
                        <p>{group.about}</p>
                        <div>
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

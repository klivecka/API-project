import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { fetchOneGroup } from "../../store/group";
import "./groupdetails.css";

export const GroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group[groupId]);

    useEffect(() => {
        console.log("THIS IS USEEFFECT RUNNING");
        dispatch(fetchOneGroup(groupId));
        // console.log('THIS IS THE USE EFFECT RUNNING')
    }, [fetchOneGroup]);

    return (
        <div className="group-details-wrapper">
            <div className="group-detail-image">group image</div>
            <div className="group-details-text-wrapper">
                <div className="group-detail-title">{group.name}</div>
                <div className="group-detail-location">
                    {group.city}, {group.state}{" "}
                </div>
                <div className="group-detail-members">
                    {group.numMembers}
                    {group.numMembers > 1 && " members"}
                    {group.numMembers === 0 && " members"}
                    {group.numMembers === 1 && " member"}
                    {" "} · {" "}
                    {group.private === true && "Private group"}
                    {group.private === false && "Public group"}
                </div>
            </div>
        </div>
    );
};

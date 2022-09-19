import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { fetchOneGroup } from "../../store/group";
import "./groupdetails.css";

export const GroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group[groupId]);
    console.log('this is group id', group)
    console.log('test')

    useEffect(() => {
        console.log('THIS IS USEEFFECT RUNNING')
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
                </div>
            </div>
        </div>
    );
};

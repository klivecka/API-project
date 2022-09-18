import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchGroups } from "../../store/group";

export const GroupList = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.group);

    console.log("THIS THE THE GROUPS FROM STATE", groups);

    useEffect(() => {
        dispatch(fetchGroups());
        // console.log('THIS IS THE USE EFFECT RUNNING')
    }, [fetchGroups]);

    return (
        <h1>group list test</h1>
    )
};

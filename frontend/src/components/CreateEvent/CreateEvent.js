import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOneEvent } from "../../store/event";

const CreateEventForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();

    const [name, setName] = useState();
    const [type, setType] = useState();
    const [capacity, setCapacity] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqBody = {groupId, name, type, capacity, price, description, startDate, endDate };
        const newGroup = await dispatch(addOneEvent(reqBody));
        const groupId = newGroup.id;
        history.push(`/groups/${groupId}`);
    };
    return (
    
    <div>create event</div>
    
    
    
    
    );
};

export default CreateEventForm;

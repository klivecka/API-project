import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

    return <div>create event</div>;
};

export default CreateEventForm;

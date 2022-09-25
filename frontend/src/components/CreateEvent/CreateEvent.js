import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOneEvent } from "../../store/event";

const CreateEventForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();

    const [name, setName] = useState("");
    const [type, setType] = useState("In person");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const reqBody = {
            groupId,
            name,
            type,
            capacity: parseInt(capacity, 10),
            price: parseInt(price, 10),
            description,
            startDate,
            endDate,
        };
        const newEvent = await dispatch(addOneEvent(reqBody)).catch(
            async (res) => {
                const data = await res.json();
                const errorsArray = Object.values(data.errors);
                setErrors(errorsArray);
                console.log("THIS IS THE ERRORS STATE", errors);
                return;
            }
        );
        console.log("THIS IS NEW EVENT", newEvent);
        if (newEvent) {
            const eventId = newEvent.id;
            history.push(`/events/`);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Capacity
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    ></input>
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </label>
                <label>
                    Start Date
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    ></input>
                </label>
                <label>
                    End Date
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    ></input>
                </label>
                <button type="submit">Create a New Event</button>
            </form>
        </>
    );
};

export default CreateEventForm;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../../store/group";
import "./creategroupform.css";

const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MY",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WI",
    "WV",
    "WY",
];

const CreateGroupForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("In person");
    const [isPrivate, setIsPrivate] = useState(false);
    const [city, setCity] = useState("");
    const [state, setState] = useState(states[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqBody = { name, about, type, private: isPrivate, city, state };
        const newGroup = await dispatch(createGroup(reqBody));
        const groupId = newGroup.id;
        history.push(`/groups/${groupId}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul></ul>
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
                About
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
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
                Private?
                <select onChange={(e) => setIsPrivate(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                ></input>
            </label>
            <label>
                State
                <select onChange={(e) => setState(e.target.value)}>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Create a New Group</button>
        </form>
    );
};

export default CreateGroupForm;

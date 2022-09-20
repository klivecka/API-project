import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const reqBody = { name, about, type, isPrivate, city, state };
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
                    value={name}
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
                onChange={(e) => setCity(e.target.value)}>
                </input>
            </label>
            <label>
                State
                <select onChange={(e) => setIsPrivate(e.target.value)}>
                    {states.map(state => <option key={state} value={state}>{state}</option>
                    )}
                </select>
            </label>
        </form>
    );
};

export default CreateGroupForm;

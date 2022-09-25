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
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const reqBody = { name, about, type, private: isPrivate, city, state };

        const newGroup = await dispatch(createGroup(reqBody)).catch(
            async (res) => {
                const data = await res.json();
                const errorsArray = data.errors;
                setErrors(Object.values(errorsArray));
                return;
            }
        );
        if (newGroup) {
            history.push(`/groups/`);
        }
    };

    return (
        <div className="create-group-form-wrapper">
            <div className="create-group-upper-text">
                <div id="meetup-logo-group-form"></div>
                <div id="create-group-title">Create a group</div>
            </div>

            <form className="create-group-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label id="name-label">
                    Name
                    <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    About
                    <textarea
                        id="about-input"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
                    <select
                        id="type-select"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                <label>
                    Private?
                    <select
                        id="type-select"
                        onChange={(e) => setIsPrivate(e.target.value)}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label>
                <label>
                    City
                    <input
                        id="name-input"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                </label>
                <label>
                    State
                    <select
                        id="type-select"
                        onChange={(e) => setState(e.target.value)}
                    >
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </label>
                <button id="create-group-button" type="submit">
                    Create a New Group
                </button>
            </form>
        </div>
    );
};

export default CreateGroupForm;

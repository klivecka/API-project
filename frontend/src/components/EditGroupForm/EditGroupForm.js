import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateGroup } from "../../store/group";
// import "./creategroupform.css";

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

const EditGroupForm = () => {
    const { groupId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group.GroupDetails);
    const [name, setName] = useState(group.name);
    const [about, setAbout] = useState(group.about);
    const [type, setType] = useState(group.type);
    const [isPrivate, setIsPrivate] = useState(group.private);
    const [city, setCity] = useState(group.city);
    const [state, setState] = useState(group.state);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqBody = {
            id: groupId,
            name,
            about,
            type,
            private: isPrivate,
            city,
            state,
        };
        const newGroup = await dispatch(updateGroup(reqBody)).catch(
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
                <div id="create-group-title">Edit a group</div>
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
                        value={type}
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
                        value={isPrivate}
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
                    Edit this Group
                </button>
            </form>
        </div>
    );
};

export default EditGroupForm;

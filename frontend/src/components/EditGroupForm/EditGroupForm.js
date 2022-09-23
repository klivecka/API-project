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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("this is group id", groupId)
        const reqBody = { id: groupId, name, about, type, private: isPrivate, city, state };
        console.log('THIS IS REQUEST BODY', reqBody)
        const newGroup = await dispatch(updateGroup(reqBody));
        console.log('THIS IS RESPONSE', newGroup)
        history.push(`/groups`);
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
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="In person">In person</option>
                    <option value="Online">Online</option>
                </select>
            </label>
            <label>
                Private?
                <select
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
            <button type="submit">Edit this Group</button>
        </form>
    );
};

export default EditGroupForm;

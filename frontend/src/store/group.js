import { csrfFetch } from "./csrf";

const LOAD_GROUPS = "groups/loadGroups";
const ONE_GROUP = "groups/oneGroup";
const ADD_ONE = "groups/addOneGroup";
const UPDATE_ONE = "groups/updateGroup";
const DELETE_ONE = "groups/deleteGroup";

const loadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        payload: groups,
    };
};

const oneGroup = (group) => {
    return {
        type: ONE_GROUP,
        payload: group,
    };
};

const addOneGroup = (group) => {
    return {
        type: ADD_ONE,
        payload: group,
    };
};

const updateOneGroup = (group) => {
    return {
        type: UPDATE_ONE,
        payload: group,
    };
};

const deleteOneGroup = (groupId) => {
    return {
        type: DELETE_ONE,
        payload: groupId,
    };
};

//FETCH ALLL GROUPS THUNK
export const fetchGroups = () => async (dispatch) => {
    const response = await csrfFetch("/api/groups");
    const groupsObject = await response.json();
    // console.log('GROUPS OBJECT', groupsObject)
    const groupsArray = groupsObject.Groups;
    // console.log('GROUPS ARRAY', groupsArray)
    dispatch(loadGroups(groupsArray));
    return groupsArray;
};

//FETCH ONE GROUP THUNK
export const fetchOneGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    const oneGroupObj = await response.json();

    dispatch(oneGroup(oneGroupObj));
    return oneGroupObj;
};

//CREATE A NEW GROUP THUNK
export const createGroup = (data) => async (dispatch) => {
    const response = await csrfFetch("/api/groups", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        let errorJSON;
        let error = await response.text();
        try {
            // Check if the error is JSON, i.e., from the Pokemon server. If so,
            // don't throw error yet or it will be caught by the following catch
            errorJSON = JSON.parse(error);
        } catch {
            // Case if server could not be reached
            throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
    }

    const newGroup = await response.json();
    dispatch(addOneGroup(newGroup));
    return newGroup;
};

//UPDATE A GROUP THUNK
export const updateGroup = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${data.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const updatedGroup = await response.json();
    dispatch(updateOneGroup(updatedGroup));
    return updatedGroup;
};

//DELETE A GROUP THUNK
export const deleteGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
    });
    dispatch(deleteOneGroup(groupId));
    return;
};

const initialState = {
    list: [],
};

//SORT FUNCTION FOR LISTS
const listsort = (list) =>
    list.sort((a, b) => {
        return a.id - b.id;
    });

const groupReducer = (state = initialState, action) => {
    let newState;
    let groupList;
    switch (action.type) {
        case LOAD_GROUPS:
            const groups = {};
            // console.log('LOAD GROUPS ACTION', action)
            groupList = action.payload;
            // console.log('GROUPS LIST', groupList)
            groupList.forEach((group) => {
                groups[group.id] = group;
            });
            return {
                ...groups,
                ...state,
                GroupDetails: {},
                list: groupList,
            };
        case ONE_GROUP:
            newState = {
                ...state,
                GroupDetails: { ...action.payload },
            };
            
            return newState;
        case ADD_ONE:
            newState = {
                ...state,
                [action.payload.id]: action.payload,
            };
            newState.list.push(action.payload);
            return newState;
        case UPDATE_ONE:
            newState = {
                ...state,
            };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_ONE:
            newState = {
                ...state,
            };
            delete newState[action.payload];
            return newState;

        default:
            return state;
    }
};

export default groupReducer;

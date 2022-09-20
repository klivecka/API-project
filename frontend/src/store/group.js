import { csrfFetch } from "./csrf";

const LOAD_GROUPS = "groups/loadGroups";
const ONE_GROUP = "groups/oneGroup";
const ADD_ONE = "groups/addOneGroup";

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

//FETCH ALLL GROUPS THUNK
export const fetchGroups = () => async (dispatch) => {
    const response = await csrfFetch("/api/groups");
    const groupsObject = await response.json();
    // console.log('GROUPS OBJECT', groupsObject)
    const groupsArray = groupsObject.Groups;
    // console.log('GROUPS ARRAY', groupsArray)
    dispatch(loadGroups(groupsArray));
};

//FETCH ONE GROUP THUNK
export const fetchOneGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    const oneGroupObj = await response.json();

    dispatch(oneGroup(oneGroupObj));
};

//CREATE A NEW GROUP THUNK
export const createGroup = (data) => async (dispatch) => {
    console.log('THIS IS THE CREATE GROUP THUNK GETTING HIT')
    console.log('THIS IS THE DATA', data)
    console.log('THIS IS THE DATA Stringified', JSON.stringify(data))
    const response = await csrfFetch("/api/groups", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log('THIS IS THE REPSONSE', response)

    if (!response.ok) {
          let errorJSON;
          let error = await response.text();
          try {
            // Check if the error is JSON, i.e., from the Pokemon server. If so,
            // don't throw error yet or it will be caught by the following catch
            errorJSON = JSON.parse(error);
          }
          catch {
            // Case if server could not be reached
            throw new Error(error);
          }
          throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
        }
      

    const newGroup = await response.json()
    console.log('THIS IS THE REPSONSE JSON', newGroup)
    dispatch(addOneGroup(newGroup))
};

const initialState = {
    list: [],
};

  

const groupReducer = (state = initialState, action) => {
    let newState
    let groupList
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
                list: groupList,
            };
        case ONE_GROUP:
            newState = {
                ...state,
                [action.payload.id]: action.payload,
            };
            return newState;
        case ADD_ONE:
            console.log('THIS IS STATE', state)
               newState = {
                ...state,
                [action.payload.id]: action.payload
               }
               console.log('this is the state.list', state.list)
               newState.list.push(action.payload)
               console.log('this is the newState.list', newState.list)
               return newState
        default:
            return state;
    }
};

export default groupReducer;

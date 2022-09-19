const LOAD_GROUPS = "groups/loadGroups";
const ONE_GROUP = "groups/oneGroup";

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

//FETCH ALLL GROUPS THUNK
export const fetchGroups = () => async (dispatch) => {
    const response = await fetch("/api/groups");
    const groupsObject = await response.json();
    // console.log('GROUPS OBJECT', groupsObject)
    const groupsArray = groupsObject.Groups;
    // console.log('GROUPS ARRAY', groupsArray)
    dispatch(loadGroups(groupsArray));
};

//FETCH ONE GROUP THUNK
export const fetchOneGroup = (groupId) => async (dispatch) => {

    const response = await fetch(`/api/groups/${groupId}`);
    const oneGroupObj = await response.json();

    dispatch(oneGroup(oneGroupObj));
};

const initialState = {
    list: [],
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const groups = {};
            // console.log('LOAD GROUPS ACTION', action)
            const groupList = action.payload;
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
            const newState = {
                ...state,
                [action.payload.id]: action.payload,
            };
            return newState;

        default:
            return state;
    }
};

export default groupReducer;

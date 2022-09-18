const LOAD_GROUPS = "groups/getGroups";

const loadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        payload: groups,
    };
};

//FETCH ALLL GROUPS THUNK
export const fetchGroups = () => async (dispatch) => {
    // console.log('THIS IS THE GROUP FETCH RUNNING')
    const response = await fetch("/api/groups");
    const groupsObject = await response.json();
    // console.log('GROUPS OBJECT', groupsObject)
    const groupsArray = groupsObject.Groups
    // console.log('GROUPS ARRAY', groupsArray)
    dispatch(loadGroups(groupsArray));
};

const initialState = {
    list: [],
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const groups = {};
            console.log('LOAD GROUPS ACTION', action)
            const groupList = action.payload;
                console.log('GROUPS LIST', groupList)
            groupList.forEach((group) => {
                groups[group.id] = group;
            })
            return {
                ...groups,
                ...state,
                list: groupList
            }
            default:
                return state;
    }
};


export default groupReducer
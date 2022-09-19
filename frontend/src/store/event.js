const LOAD_EVENTS = "events/loadEvents";

const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        payload: events,
    };
};

export const fetchEvents = () => async (dispatch) => {
    const response = await fetch("/api/events");
    const eventsObj = await response.json();
    // console.log('THIS IS THE EVENTS OBJ', eventsObj)
    const eventsArray = eventsObj.Events;
    dispatch(loadEvents(eventsArray));
};

const initialState = {
    list: [],
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const events = {};
            const eventList = action.payload;
            eventList.forEach((event) => {
                events[event.id] = event;
            });
            return {
                ...events,
                ...state,
                list: eventList,
            };
        default:
            return state;
    }
};

export default eventReducer
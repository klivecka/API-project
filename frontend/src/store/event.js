const LOAD_EVENTS = "events/loadEvents";
const ONE_EVENT = "events/oneEvent";

const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        payload: events,
    };
};

const oneEvent = (event) => {
    return {
        type: ONE_EVENT,
        payload: event,
    };
};

//FETCH ALL EVENTS THUNK
export const fetchEvents = () => async (dispatch) => {
    const response = await fetch("/api/events");
    const eventsObj = await response.json();
    // console.log('THIS IS THE EVENTS OBJ', eventsObj)
    const eventsArray = eventsObj.Events;
    dispatch(loadEvents(eventsArray));
};

//FETCH ONE EVENT THUNK
export const fetchOneEvent = (eventId) => async (dispatch) => {
    const response = await fetch(`/api/events/${eventId}`);
    const oneEventObj = await response.json();

    dispatch(oneEvent(oneEventObj));
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
        case ONE_EVENT:
            const newState = {
                ...state,
                [action.payload.id]: action.payload,
            };
            return newState;

        default:
            return state;
    }
};

export default eventReducer;

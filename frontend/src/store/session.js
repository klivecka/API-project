import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//LOGIN THUNK
export const login = (user) => async (dispatch) => {
    // console.log('THIS IS THE LOGIN THUNK GETTING HIT')
  const { credential, password } = user;
  // console.log('THIS IS THE USER GETTING SENT', user)
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
  const data = await response.json();
  // console.log('THIS IS THE RESPONSE JSON', data)
  dispatch(setUser(data));}
  else {
    const resJson = await response.json()
    const resBody = resJson.body
    return resBody
  }
};

//RESTORE THUNK
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };

  //SIGNUP THUNK
  export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };
  
  //LOGOUT THUNK
  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
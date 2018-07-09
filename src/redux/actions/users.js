import { getAllUsers, signupUser, deleteUser } from '../services/users';

export const SET_USERS = 'SET_USERS';
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

// export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';

export const getUsersList = data => dispatch => {
  dispatch({ type: GET_USERS_REQUEST });
  return getAllUsers(data)
    .then(res => {
      dispatch({ type: GET_USERS_SUCCESS });
      dispatch({ type: SET_USERS, payload: res.data });
      return res;
    })
    .catch(err => {
      dispatch({ type: GET_USERS_FAIL });
      console.log('GET USERS ERROR: ', err.response);
    });
};

export const signupNewUser = data => dispatch => {
  // dispatch({ type: GET_USERS_REQUEST });
  return signupUser(data)
    .then(res => {
      console.log('SDD USER RESULT: ', res);
      // dispatch({ type: GET_USERS_SUCCESS });
      // dispatch({ type: SET_USERS, payload: res.data });
      dispatch(getUsersList());
      return res;
    });
};

export const removeUser = id => dispatch => {
  return deleteUser(id)
    .then(res => {
      console.log('DELETE USER RESULT: ', res);
      dispatch(getUsersList());
      return res;
    });
};
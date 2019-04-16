import { getAllMembers } from '../services/members';

export const GET_MEMBERS_REQUEST = 'GET_MEMBERS_REQUEST';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const SET_MEMBERS = 'SET_MEMBERS';
export const GET_MEMBERS_FAIL = 'GET_MEMBERS_FAIL';

export const getMembersList = data => dispatch => {
  dispatch({ type: GET_MEMBERS_REQUEST });
  return getAllMembers(data)
    .then(res => {
      dispatch({ type: GET_MEMBERS_SUCCESS });
      dispatch({ type: SET_MEMBERS, payload: res.data });
      return res;
    })
    .catch(err => {
      dispatch({ type: GET_MEMBERS_FAIL });
      console.log('GET MEMBERS ERROR: ', err.response);
    });
};
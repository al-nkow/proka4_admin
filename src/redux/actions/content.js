import { getContent, saveContent } from '../services/content';

export const SET_CONTENT = 'SET_CONTENT';
export const GET_CONTENT_REQUEST = 'GET_CONTENT_REQUEST';
export const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
export const GET_CONTENT_FAIL = 'GET_CONTENT_FAIL';

export const getSiteContent = data => dispatch => {
  dispatch({ type: GET_CONTENT_REQUEST });
  return getContent(data)
    .then(res => {
      dispatch({ type: GET_CONTENT_SUCCESS });
      dispatch({ type: SET_CONTENT, payload: res.data });
      return res;
    })
    .catch(err => {
      dispatch({ type: GET_CONTENT_FAIL });
      console.log('GET CONTENT ERROR: ', err.response);
    });
};

export const saveSiteContent = data => dispatch => {
  return saveContent(data)
    .then(res => {
      dispatch(getSiteContent());
      return res;
    });
};
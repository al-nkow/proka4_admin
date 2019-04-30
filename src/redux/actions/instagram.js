import { saveToken } from '../services/instagram';

export const SET_TOKEN = 'SET_TOKEN';
export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';

export const saveAccessToken = data => dispatch => {
  return saveToken(data)
    .then(res => {
      return res;
    });
};
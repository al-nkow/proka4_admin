import { createQuestion, getAllQuestions } from '../services/faq';
import idx from 'idx';

export const SET_FAQ = 'SET_FAQ';
export const GET_FAQ_REQUEST = 'GET_FAQ_REQUEST';
export const GET_FAQ_SUCCESS = 'GET_FAQ_SUCCESS';

export const createQuestionItem = data => dispatch => {
  return createQuestion(data)
    .then(res => {
      dispatch(getQuestionsList());
      return res;
    });
};

export const getQuestionsList = params => dispatch => {
  dispatch({ type: GET_FAQ_REQUEST });
  return getAllQuestions(params)
    .then(res => {
      dispatch({ type: GET_FAQ_SUCCESS });
      let result = idx(res, _ => _.data.list);
      dispatch({ type: SET_FAQ, payload: result });
      return res;
    });
};
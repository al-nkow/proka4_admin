import { createReview } from '../services/reviews';
// import idx from 'idx';
//
// export const SET_REVIEWS = 'SET_NEWS';
// export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
// export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
// export const GET_NEWS_FAIL = 'GET_NEWS_FAIL';

export const createReviewItem = data => dispatch => {
  // dispatch({ type: GET_USERS_REQUEST });
  return createReview(data)
    .then(res => {
      // dispatch({ type: GET_USERS_SUCCESS });
      // dispatch({ type: SET_USERS, payload: res.data });
      // dispatch(getNewsList());
      return res;
    });
};
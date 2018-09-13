import { createReview, getAllReviews, deleteReview } from '../services/reviews';
import idx from 'idx';
import {deleteNews} from "../services/news";
import {getNewsList} from "./news";

export const SET_REVIEWS = 'SET_REVIEWS';
export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';

export const createReviewItem = data => dispatch => {
  return createReview(data)
    .then(res => {
      dispatch(getReviewsList());
      return res;
    });
};

export const getReviewsList = params => dispatch => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  return getAllReviews(params)
    .then(res => {
      dispatch({ type: GET_REVIEWS_SUCCESS });
      let result = idx(res, _ => _.data.reviews);
      dispatch({ type: SET_REVIEWS, payload: result });
      return res;
    });
};

export const deleteReviewItem = id => dispatch => {
  return deleteReview(id)
    .then(res => {
      dispatch(getReviewsList());
      return res;
    });
};

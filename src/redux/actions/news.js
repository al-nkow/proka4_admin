import { createNews, getAllNews, deleteNews, updateNews } from '../services/news';
import idx from 'idx';

export const SET_NEWS = 'SET_NEWS';
export const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST';
export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
// export const GET_NEWS_FAIL = 'GET_NEWS_FAIL';

export const createNewsItem = data => dispatch => {
  // dispatch({ type: GET_USERS_REQUEST });
  return createNews(data)
    .then(res => {
      // dispatch({ type: GET_USERS_SUCCESS });
      // dispatch({ type: SET_USERS, payload: res.data });
      dispatch(getNewsList());
      return res;
    });
};

export const updateNewsItem = (id, data) => dispatch => {
  // dispatch({ type: GET_USERS_REQUEST });
  return updateNews(id, data)
    .then(res => {
      // dispatch({ type: GET_USERS_SUCCESS });
      // dispatch({ type: SET_USERS, payload: res.data });
      dispatch(getNewsList());
      return res;
    });
};

export const getNewsList = params => dispatch => {
  dispatch({ type: GET_NEWS_REQUEST });
  return getAllNews(params)
    .then(res => {
      dispatch({ type: GET_NEWS_SUCCESS });
      let result = idx(res, _ => _.data.news);
      dispatch({ type: SET_NEWS, payload: result });
      return res;
    });
};

export const deleteNewsItem = id => dispatch => {
  return deleteNews(id)
    .then(res => {
      console.log('DELETE NEWS ITEM RESULT: ', res);
      dispatch(getNewsList());
      return res;
    });
};
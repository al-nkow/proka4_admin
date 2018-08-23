import { createNews, getAllNews } from '../services/news';
import idx from 'idx';
import moment from 'moment';

export const SET_NEWS = 'SET_NEWS';
// export const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST';
// export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
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

export const getNewsList = params => dispatch => {
  // dispatch({ type: GET_USERS_REQUEST });
  return getAllNews(params)
    .then(res => {
      // dispatch({ type: GET_USERS_SUCCESS });
      let result = idx(res, _ => _.data.news);
      // if (result) result = result.map(d => {
      //   d.viewDate = moment(d.date).format('DD.MM.YYYY HH:mm');
      //   return d;
      // });
      dispatch({ type: SET_NEWS, payload: result });
      return res;
    });
};
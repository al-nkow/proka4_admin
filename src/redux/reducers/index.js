import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './users';
import content from './content';
import news from './news';
import reviews from './reviews';

export default combineReducers({
  form: formReducer,
  users,
  content,
  news,
  reviews
});

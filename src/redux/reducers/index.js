import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './users';
import content from './content';
import news from './news';
import reviews from './reviews';
import faq from './faq';
import partners from './partners';
import documents from './documents';
import members from './members';

export default combineReducers({
  form: formReducer,
  users,
  content,
  news,
  reviews,
  faq,
  partners,
  documents,
  members
});

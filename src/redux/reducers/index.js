import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './users';
import content from './content';

export default combineReducers({
  form: formReducer,
  users,
  content
});

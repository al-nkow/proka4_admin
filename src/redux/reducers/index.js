import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import currentUser from './currentUser';

export default combineReducers({
  form: formReducer,
});

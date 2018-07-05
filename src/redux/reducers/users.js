import {
  SET_USERS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from '../actions/users';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'FAIL',
      };
    case SET_USERS: {
      // const { list, totalCount } = action.payload;
      const { users } = action.payload;
      return {
        ...state,
        list: users,
        // totalCount,
      };
    }
    default:
      return state;
  }
};

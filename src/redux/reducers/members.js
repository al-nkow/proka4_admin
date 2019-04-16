import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  SET_MEMBERS,
  GET_MEMBERS_FAIL
} from '../actions/members'

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    case GET_MEMBERS_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'FAIL',
      };
    case SET_MEMBERS: {
      const { members } = action.payload;
      return {
        ...state,
        list: members,
      };
    }
    default:
      return state;
  }
};
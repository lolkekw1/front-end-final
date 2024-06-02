import * as types from '../actions/ActionTypes.ts';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.LOGOUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default userReducer;

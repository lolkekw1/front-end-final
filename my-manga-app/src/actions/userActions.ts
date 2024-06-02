import * as types from './ActionTypes.ts';
import { Dispatch } from 'redux';

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
}

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST as typeof types.LOGIN_REQUEST,
});

export const loginSuccess = (userData: UserData) => ({
  type: types.LOGIN_SUCCESS as typeof types.LOGIN_SUCCESS,
  payload: userData,
});

export const loginFail = (error: string) => ({
  type: types.LOGIN_FAIL as typeof types.LOGIN_FAIL,
  payload: error,
});

export const loginUser = (credentials: Credentials) => async (dispatch: Dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    dispatch(loginSuccess(data));

    return Promise.resolve(data);
  } catch (error) {
    dispatch(loginFail(error.message));
    return Promise.reject(error);
  }
};

export const registerRequest = () => ({
  type: types.REGISTER_REQUEST as typeof types.REGISTER_REQUEST,
});

export const registerSuccess = (userData: UserData) => ({
  type: types.REGISTER_SUCCESS as typeof types.REGISTER_SUCCESS,
  payload: userData,
});

export const registerFail = (error: string) => ({
  type: types.REGISTER_FAIL as typeof types.REGISTER_FAIL,
  payload: error,
});

export const registerUser = (credentials: Credentials) => async (dispatch: Dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    dispatch(registerSuccess(data));

    return Promise.resolve(data);
  } catch (error) {
    dispatch(registerFail(error.message));
    return Promise.reject(error);
  }
};

export const updateUser = (userData: UserData) => ({
  type: types.UPDATE_USER as typeof types.UPDATE_USER,
  payload: userData,
});

export const logout = () => ({
  type: types.LOGOUT as typeof types.LOGOUT,
});

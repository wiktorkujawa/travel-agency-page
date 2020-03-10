import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password })

  axios.post('/api/users', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
}

// reset password
export const resetPassword = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify(email)


  axios.post(`/api/auth/user/reset_password`, body, config)
    .then(res => dispatch({
      type: RESET_PASSWORD,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'RESET_PASSWORD_FAIL'));
      dispatch({
        type: RESET_PASSWORD_FAIL
      });
    });
}

// Change password
export const receivePassword = (userId, token, password) => (dispatch, getState) => {

  axios.post(`/api/auth/receive_new_password/${userId}/${token}`, password, tokenConfig(getState))
    .then(res => dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_PASSWORD_FAIL'));
      dispatch({
        type: CHANGE_PASSWORD_FAIL
      });
    });
}



// Change password
export const changePassword = (newPassword) => (dispatch, getState) => {

  axios.post(`/api/auth/user/changePassword/`, newPassword, tokenConfig(getState))
    .then(res => dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_PASSWORD_FAIL'));
      dispatch({
        type: CHANGE_PASSWORD_FAIL
      });
    });
}




// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ email, password })
  axios.post('/api/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      });
    });
}

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      // "Accept": "application/json, multipart/form-data"
      "Content-type": "application/json"
    }
  }

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}
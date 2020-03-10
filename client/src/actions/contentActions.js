import axios from 'axios';
import { GET_CONTENT, UPDATE_CONTENT, CONTENT_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getContent = () => dispatch => {
  dispatch(setContentLoading());
  axios
    .get('/api/contents')
    .then(res =>
      dispatch({
        type: GET_CONTENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateContent = (id, item) => (dispatch, getState) => {
  axios
    .put(`/api/contents/${id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_CONTENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};


export const setContentLoading = () => {
  return {
    type: CONTENT_LOADING
  };
};
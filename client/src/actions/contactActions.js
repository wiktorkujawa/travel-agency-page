import axios from 'axios';
import { GET_CONTACT, UPDATE_CONTACT, CONTACT_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getContact = () => dispatch => {
  dispatch(setContactLoading());
  axios
    .get('/api/contacts')
    .then(res =>
      dispatch({
        type: GET_CONTACT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateContact = (id, item) => (dispatch, getState) => {
  axios
    .put(`/api/contacts/${id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};


export const setContactLoading = () => {
  return {
    type: CONTACT_LOADING
  };
};
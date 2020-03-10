import axios from 'axios';
import { GET_INSURANCE, ADD_INSURANCE, INSURANCE_LOADING, UPDATE_INSURANCE } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getInsurance = () => dispatch => {
  dispatch(setInsuranceLoading());
  axios
    .get('/api/insurances')
    .then(res =>
      dispatch({
        type: GET_INSURANCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const addInsurance = insurance => (dispatch, getState) => {
  axios
    .post('/api/insurances', insurance, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_INSURANCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateInsurance = (id, insurance) => (dispatch, getState) => {
  axios
    .put(`/api/insurances/${id}`, insurance, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_INSURANCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const setInsuranceLoading = () => {
  return {
    type: INSURANCE_LOADING
  };
};
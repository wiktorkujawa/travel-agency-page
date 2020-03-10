import axios from 'axios';
import { GET_OFFERS, ADD_OFFER, DELETE_OFFER, OFFERS_LOADING, UPDATE_OFFER } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getOffers = () => dispatch => {
  dispatch(setOffersLoading());
  axios
    .get('/api/offers')
    .then(res =>
      dispatch({
        type: GET_OFFERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const addOffer = offer => (dispatch, getState) => {
  axios
    .post('/api/offers', offer, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_OFFER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const deleteOffer = id => (dispatch, getState) => {
  axios
    .delete(`/api/offers/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_OFFER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateOffer = (id, offer) => (dispatch, getState) => {
  axios
    .put(`/api/offers/${id}`, offer, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_OFFER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING
  };
};
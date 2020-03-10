import axios from 'axios';
import { GET_SLIDES, ADD_SLIDE, DELETE_SLIDE, SLIDES_LOADING, UPDATE_SLIDE } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getSlides = () => dispatch => {
  dispatch(setSlidesLoading());
  axios
    .get('/api/slides')
    .then(res =>
      dispatch({
        type: GET_SLIDES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const addSlide = slide => (dispatch, getState) => {
  axios
    .post('/api/slides', slide, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_SLIDE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const deleteSlide = id => (dispatch, getState) => {
  axios
    .delete(`/api/slides/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_SLIDE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateSlide = (id, slide) => (dispatch, getState) => {
  axios
    .put(`/api/slides/${id}`, slide, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_SLIDE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const setSlidesLoading = () => {
  return {
    type: SLIDES_LOADING
  };
};
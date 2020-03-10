import axios from 'axios';
import { GET_PHOTOS, ADD_PHOTO, DELETE_PHOTO, PHOTOS_LOADING, UPDATE_PHOTO } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getPhotos = () => dispatch => {
  dispatch(setPhotosLoading());
  axios
    .get('/api/gallery')
    .then(res =>
      dispatch({
        type: GET_PHOTOS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const addPhoto = gallery => (dispatch, getState) => {
  axios
    .post('/api/gallery', gallery, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_PHOTO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const deletePhoto = id => (dispatch, getState) => {
  axios
    .delete(`/api/gallery/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_PHOTO,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updatePhoto = (id, gallery) => (dispatch, getState) => {
  axios
    .put(`/api/gallery/${id}`, gallery, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_PHOTO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const setPhotosLoading = () => {
  return {
    type: PHOTOS_LOADING
  };
};
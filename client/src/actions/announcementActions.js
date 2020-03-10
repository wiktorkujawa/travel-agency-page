import axios from 'axios';
import { GET_ANNOUNCEMENTS, ADD_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, ANNOUNCEMENTS_LOADING, UPDATE_ANNOUNCEMENT } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getAnnouncements = () => dispatch => {
  dispatch(setAnnouncementsLoading());
  axios
    .get('/api/announcements')
    .then(res =>
      dispatch({
        type: GET_ANNOUNCEMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};
export const addAnnouncement = announcement => (dispatch, getState) => {
  axios
    .post('/api/announcements', announcement, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ANNOUNCEMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const deleteAnnouncement = id => (dispatch, getState) => {
  axios
    .delete(`/api/announcements/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ANNOUNCEMENT,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateAnnouncement = (id, announcement) => (dispatch, getState) => {
  axios
    .put(`/api/announcements/${id}`, announcement, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_ANNOUNCEMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const setAnnouncementsLoading = () => {
  return {
    type: ANNOUNCEMENTS_LOADING
  };
};
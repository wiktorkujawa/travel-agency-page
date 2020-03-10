import axios from 'axios';
import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING, UPDATE_QUESTION } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getQuestions = () => dispatch => {
  dispatch(setQuestionsLoading());
  axios
    .get('/api/questions')
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};
export const addQuestion = question => (dispatch, getState) => {
  axios
    .post('/api/questions', question, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const deleteQuestion = id => (dispatch, getState) => {
  axios
    .delete(`/api/questions/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_QUESTION,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const updateQuestion = (id, question) => (dispatch, getState) => {
  axios
    .put(`/api/questions/${id}`, question, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.error, err.response.status))
    );
};

export const setQuestionsLoading = () => {
  return {
    type: QUESTIONS_LOADING
  };
};
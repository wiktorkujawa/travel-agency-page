import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING, UPDATE_QUESTION } from '../actions/types';

const initialState = {
  questions: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map(
          question =>
            question._id === action.payload.id
              //return action payload (modified question) instead of
              //  original question when question id is updated question id
              ? action.payload
              : question//ids not the same, return original question
        )
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question._id !== action.payload)
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions]
      };
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
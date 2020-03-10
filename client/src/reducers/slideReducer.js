import { GET_SLIDES, ADD_SLIDE, DELETE_SLIDE, SLIDES_LOADING, UPDATE_SLIDE } from '../actions/types';

const initialState = {
  slides: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SLIDES:
      return {
        ...state,
        slides: action.payload,
        loading: false
      };
    case UPDATE_SLIDE:
      return {
        ...state,
        slides: state.slides.map(
          slide =>
            slide._id === action.payload.id
              //return action payload (modified item) instead of
              //  original item when item id is updated item id
              ? action.payload
              : slide//ids not the same, return original item
        )
      };
    case DELETE_SLIDE:
      return {
        ...state,
        slides: state.slides.filter(slide => slide.files_id !== action.payload)
      };
    case ADD_SLIDE:
      return {
        ...state,
        slides: [action.payload, ...state.slides]
      };
    case SLIDES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
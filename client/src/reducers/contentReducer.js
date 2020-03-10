import { GET_CONTENT, UPDATE_CONTENT, CONTENT_LOADING } from '../actions/types';

const initialState = {
  contents: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTENT:
      return {
        ...state,
        contents: action.payload,
        loading: false
      };
    case UPDATE_CONTENT:
      return {
        ...state,
        contents: state.contents.map(
          content =>
            content._id === action.payload.id
              //return action payload (modified item) instead of
              //  original item when item id is updated item id
              ? action.payload
              : content//ids not the same, return original item
        )
      };
    case CONTENT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}


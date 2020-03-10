import { GET_PHOTOS, ADD_PHOTO, DELETE_PHOTO, PHOTOS_LOADING, UPDATE_PHOTO } from '../actions/types';

const initialState = {
  photos: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false
      };
    case UPDATE_PHOTO:
      return {
        ...state,
        photos: state.photos.map(
          photo =>
            photo._id === action.payload.id
              //return action payload (modified item) instead of
              //  original item when item id is updated item id
              ? action.payload
              : photo//ids not the same, return original item
        )
      };
    case DELETE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter(photo => photo.files_id !== action.payload)
      };
    case ADD_PHOTO:
      return {
        ...state,
        photos: [action.payload, ...state.photos]
      };
    case PHOTOS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
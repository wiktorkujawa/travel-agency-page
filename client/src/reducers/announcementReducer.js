import { GET_ANNOUNCEMENTS, ADD_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, ANNOUNCEMENTS_LOADING, UPDATE_ANNOUNCEMENT } from '../actions/types';

const initialState = {
  announcements: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload,
        loading: false
      };
    case UPDATE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.map(
          announcement =>
            announcement._id === action.payload.id
              //return action payload (modified announcement) instead of
              //  original announcement when announcement id is updated announcement id
              ? action.payload
              : announcement//ids not the same, return original announcement
        )
      };
    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(announcement => announcement._id !== action.payload)
      };
    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [action.payload, ...state.announcements]
      };
    case ANNOUNCEMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
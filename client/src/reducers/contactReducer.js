import { GET_CONTACT, UPDATE_CONTACT, CONTACT_LOADING } from '../actions/types';

const initialState = {
  contacts: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact._id === action.payload.id
              //return action payload (modified item) instead of
              //  original item when item id is updated item id
              ? action.payload
              : contact//ids not the same, return original item
        )
      };
    case CONTACT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}


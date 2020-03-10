import { GET_OFFERS, ADD_OFFER, DELETE_OFFER, OFFERS_LOADING, UPDATE_OFFER } from '../actions/types';

const initialState = {
  offers: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false
      };
    case UPDATE_OFFER:
      return {
        ...state,
        offers: state.offers.map(
          offer =>
            offer.files_id === action.payload.id
              //return action payload (modified item) instead of
              //  original item when item id is updated item id
              ? action.payload
              : offer//ids not the same, return original item
        )
      };
    case DELETE_OFFER:
      return {
        ...state,
        offers: state.offers.filter(offer => offer.files_id !== action.payload)
      };
    case ADD_OFFER:
      return {
        ...state,
        offers: [action.payload, ...state.offers]
      };
    case OFFERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
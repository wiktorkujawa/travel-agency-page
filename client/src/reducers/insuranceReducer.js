import { GET_INSURANCE, ADD_INSURANCE, INSURANCE_LOADING, UPDATE_INSURANCE } from '../actions/types';

const initialState = {
  insurances: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INSURANCE:
      return {
        ...state,
        insurances: action.payload,
        loading: false
      };
    case UPDATE_INSURANCE:
      return {
        ...state,
        insurances: state.insurances.map(
          insurance =>
            insurance.files_id === action.payload.id
              //return action payload (modified item) instead of
              //  original item when item id is updated item id
              ? action.payload
              : insurance//ids not the same, return original item
        )
      };
    case ADD_INSURANCE:
      return {
        ...state,
        insurances: [action.payload, ...state.insurances]
      };
    case INSURANCE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
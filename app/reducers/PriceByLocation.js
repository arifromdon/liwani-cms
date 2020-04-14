import {
  PRICE_BY_LOCATION_REQUEST,
  PRICE_BY_LOCATION_SUCCESS,
  PRICE_BY_LOCATION_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loadingPrice: false,
  errorMessage: ''
}

export default function priceByLocation(state = initialState, action) {
  switch (action.type) {
    case PRICE_BY_LOCATION_REQUEST:
      return {
        ...state,
        loadingPrice: true,
        errorMessage: action.errorMessage,
      }
    case PRICE_BY_LOCATION_SUCCESS:
      return {
        ...state,
        loadingPrice: false,
        dataPriceLocation: action.data,
      }
    case PRICE_BY_LOCATION_FAILURE:
      return {
        ...state,
        loadingPrice: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

import {
  EDIT_PRICE_REQUEST,
  EDIT_PRICE_SUCCESS,
  EDIT_PRICE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loadingEdit: false,
  errorMessageEdit: ''
}

export default function editPrice(state = initialState, action) {
  switch (action.type) {
    case EDIT_PRICE_REQUEST:
      return {
        ...state,
        loadingEdit: true,
        errorMessageEdit: action.errorMessage,
      }
    case EDIT_PRICE_SUCCESS:
      return {
        ...state,
        loadingEdit: false,
        dataEditPrice: action.data,
      }
    case EDIT_PRICE_FAILURE:
      return {
        ...state,
        loadingEdit: false,
        errorMessageEdit: action.errorMessage,
      }
    default:
      return state
  }
}

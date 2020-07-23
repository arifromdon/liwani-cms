import {
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingReset: false,
  errorMessage: ''
}

export default function resetPassword(state = initialState, action) {
  switch (action.type) {
    case RESET_PASS_REQUEST:
      return {
        ...state,
        isFetchingReset: true,
      }
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        isFetchingReset: false,
        errorMessage:  action.data,
      }
    case RESET_PASS_FAILURE:
      return {
        ...state,
        isFetchingReset: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

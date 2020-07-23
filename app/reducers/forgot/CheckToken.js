import {
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingCheck: false,
  errorMessageCheck: ''
}

export default function checkToken(state = initialState, action) {
  switch (action.type) {
    case CHECK_TOKEN_REQUEST:
      return {
        ...state,
        isFetchingCheck: true,
      }
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        isFetchingCheck: false,
        errorMessageCheck:  action.data,
      }
    case CHECK_TOKEN_FAILURE:
      return {
        ...state,
        isFetchingCheck: false,
        errorMessageCheck: action.errorMessage,
      }
    default:
      return state
  }
}

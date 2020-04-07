import {
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loadingForgot: false,
  errorMessageForgot: ''
}

export default function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASS_REQUEST:
      return {
        ...state,
        loadingForgot: true,
        errorMessageForgot: action.errorMessage,
      }
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        loadingForgot: false,
        dataForgotPassword: action.data,
      }
    case FORGOT_PASS_FAILURE:
      return {
        ...state,
        loadingForgot: false,
        errorMessageForgot: action.errorMessage,
      }
    default:
      return state
  }
}

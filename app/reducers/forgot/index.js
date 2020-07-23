import {
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingForgot: false,
  errorMessageForgot: '',
  responseForgot: {},
}

export default function forgot(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASS_REQUEST:
      return {
        ...state,
        isFetchingForgot: true,
      }
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        responseForgot: action.data,
        isFetchingForgot: false,
        errorMessageForgot: action.data.meta.message,
      }
    case FORGOT_PASS_FAILURE:
      return {
        ...state,
        isFetchingForgot: false,
        errorMessageForgot: action.errorMessage.response.statusText,
      }
    default:
      return state
  }
}

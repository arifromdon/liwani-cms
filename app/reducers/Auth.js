import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  UPDATE_AUTH_CURRENT_USER,
} from 'constants/ActionTypes'

const initialState = {
  isAuthenticating: false,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      }
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        currentUser: action.currentUser,
      }
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        errorMessage: action.errorMessage,
      }
    case UPDATE_AUTH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      }
    default:
      return state
  }
}

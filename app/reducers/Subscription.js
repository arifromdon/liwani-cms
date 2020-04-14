import {
  LIST_SUBSCRIPTION_REQUEST,
  LIST_SUBSCRIPTION_SUCCESS,
  LIST_SUBSCRIPTION_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loading: false,
  errorMessage: ''
}

export default function subscription(state = initialState, action) {
  switch (action.type) {
    case LIST_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: action.errorMessage,
      }
    case LIST_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSubscription: action.data,
      }
    case LIST_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

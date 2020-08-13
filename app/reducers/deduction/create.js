import {
  CREATE_DEDUCTION_REQUEST,
  CREATE_DEDUCTION_SUCCESS,
  CREATE_DEDUCTION_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingCreate: false,
  errorMessageCreate: ''
}

export default function createDeduction(state = initialState, action) {
  switch (action.type) {
    case CREATE_DEDUCTION_REQUEST:
      return {
        ...state,
        isFetchingCreate: true,
      }
    case CREATE_DEDUCTION_SUCCESS:
      return {
        ...state,
        isFetchingCreate: false,
        errorMessageCreate: action.data.meta.message,
      }
    case CREATE_DEDUCTION_FAILURE:
      return {
        ...state,
        isFetchingCreate: false,
        errorMessageCreate: action.errorMessage.response.data.meta.message,
      }
    default:
      return state
  }
}

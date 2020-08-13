import {
  LIST_DEDUCTION_REQUEST,
  LIST_DEDUCTION_SUCCESS,
  LIST_DEDUCTION_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataDeduction: [],
  pagination: [],
}

export default function deduction(state = initialState, action) {
  switch (action.type) {
    case LIST_DEDUCTION_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LIST_DEDUCTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        dataDeduction: action.data.data,
      }
    case LIST_DEDUCTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

import {
  LIST_EMPLOYEE_REQUEST,
  LIST_EMPLOYEE_SUCCESS,
  LIST_EMPLOYEE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataEmployee: [],
  pagination: [],
}

export default function employee(state = initialState, action) {
  switch (action.type) {
    case LIST_EMPLOYEE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LIST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        dataEmployee: action.data.data.data,
        pagination: action.data.data.pagination,
      }
    case LIST_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

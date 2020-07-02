import {
  LIST_SALARY_REQUEST,
  LIST_SALARY_SUCCESS,
  LIST_SALARY_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataSalary: [],
  pagination: [],
}

export default function salary(state = initialState, action) {
  switch (action.type) {
    case LIST_SALARY_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LIST_SALARY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        dataSalary: action.data.results,
        pagination: action.data.pagination,
      }
    case LIST_SALARY_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

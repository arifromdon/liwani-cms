import {
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingCreate: false,
  dataEmployeeCreate: [],
  pagination: [],
}

export default function createEmployee(state = initialState, action) {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        isFetchingCreate: true,
      }
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetchingCreate: false,
        errorMessage: null,
        dataEmployeeCreate: action.data.data.data,
        pagination: action.data.data.pagination,
      }
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetchingCreate: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

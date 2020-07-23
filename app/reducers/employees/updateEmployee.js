import {
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingUpdate: false,
  dataEmployeeUpdate: [],
}

export default function updateEmployee(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        isFetchingUpdate: true,
      }
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetchingUpdate: false,
        errorMessage: null,
        dataEmployeeUpdate: action.data.data.data,
      }
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetchingUpdate: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

import {
  EMPLOYEE_RECAP_REQUEST,
  EMPLOYEE_RECAP_SUCCESS,
  EMPLOYEE_RECAP_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingEmployee: false,
  dataRecapEmployee: {},
}

export default function recapEmployee(state = initialState, action) {
  switch (action.type) {
    case EMPLOYEE_RECAP_REQUEST:
      return {
        ...state,
        isFetchingEmployee: true,
      }
    case EMPLOYEE_RECAP_SUCCESS:
      return {
        ...state,
        isFetchingEmployee: false,
        errorMessage: null,
        dataRecapEmployee: action.data.data,
      }
    case EMPLOYEE_RECAP_FAILURE:
      return {
        ...state,
        isFetchingEmployee: false,
        errorMessage: action.errorMessage,
        dataRecapEmployee: {}
      }
    default:
      return state
  }
}

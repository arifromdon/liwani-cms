import {
  DETAIL_SALARY_REQUEST,
  DETAIL_SALARY_SUCCESS,
  DETAIL_SALARY_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingDetail: false,
  dataDetailSalary: {},
}

export default function detailSalary(state = initialState, action) {
  switch (action.type) {
    case DETAIL_SALARY_REQUEST:
      return {
        ...state,
        isFetchingDetail: true,
      }
    case DETAIL_SALARY_SUCCESS:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: null,
        dataDetailSalary: action.data,
      }
    case DETAIL_SALARY_FAILURE:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

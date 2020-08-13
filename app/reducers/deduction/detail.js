import {
  DETAIL_DEDUCTION_REQUEST,
  DETAIL_DEDUCTION_SUCCESS,
  DETAIL_DEDUCTION_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingDetail: false,
  dataDetailStock: {},
}

export default function detailStock(state = initialState, action) {
  switch (action.type) {
    case DETAIL_DEDUCTION_REQUEST:
      return {
        ...state,
        isFetchingDetail: true,
      }
    case DETAIL_DEDUCTION_SUCCESS:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: null,
        dataDetailStock: action.data.data,
      }
    case DETAIL_DEDUCTION_FAILURE:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

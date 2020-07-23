import {
  DETAIL_STOCK_REQUEST,
  DETAIL_STOCK_SUCCESS,
  DETAIL_STOCK_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingDetail: false,
  dataDetailStock: {},
}

export default function detailStock(state = initialState, action) {
  switch (action.type) {
    case DETAIL_STOCK_REQUEST:
      return {
        ...state,
        isFetchingDetail: true,
      }
    case DETAIL_STOCK_SUCCESS:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: null,
        dataDetailStock: action.data.data,
      }
    case DETAIL_STOCK_FAILURE:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

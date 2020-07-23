import {
  LIST_STOCK_REQUEST,
  LIST_STOCK_SUCCESS,
  LIST_STOCK_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataStock: [],
  pagination: [],
}

export default function stock(state = initialState, action) {
  switch (action.type) {
    case LIST_STOCK_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LIST_STOCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        dataStock: action.data.data.data,
        pagination: action.data.data.pagination,
      }
    case LIST_STOCK_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

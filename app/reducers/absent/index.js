import {
  LIST_ABSENT_REQUEST,
  LIST_ABSENT_SUCCESS,
  LIST_ABSENT_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataAbsent: [],
  pagination: [],
}

export default function absent(state = initialState, action) {
  switch (action.type) {
    case LIST_ABSENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LIST_ABSENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        dataAbsent: action.data.data,
        pagination: action.data.pagination,
      }
    case LIST_ABSENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

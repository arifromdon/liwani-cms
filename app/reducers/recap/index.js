import {
  LIST_RECAP_REQUEST,
  LIST_RECAP_SUCCESS,
  LIST_RECAP_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataRecap: [],
  pagination: [],
}

export default function recap(state = initialState, action) {
  switch (action.type) {
    case LIST_RECAP_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LIST_RECAP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        dataRecap: action.data.results,
        pagination: action.data.pagination,
      }
    case LIST_RECAP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

import {
  HISTORY_RECAP_REQUEST,
  HISTORY_RECAP_SUCCESS,
  HISTORY_RECAP_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingHistory: false,
  dataHistoryRecap: [],
}

export default function historyRecap(state = initialState, action) {
  switch (action.type) {
    case HISTORY_RECAP_REQUEST:
      return {
        ...state,
        isFetchingHistory: true,
      }
    case HISTORY_RECAP_SUCCESS:
      return {
        ...state,
        isFetchingHistory: false,
        errorMessage: null,
        dataHistoryRecap: action.data.data,
      }
    case HISTORY_RECAP_FAILURE:
      return {
        ...state,
        isFetchingHistory: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

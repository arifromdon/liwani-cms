import {
  DETAIL_RECAP_REQUEST,
  DETAIL_RECAP_SUCCESS,
  DETAIL_RECAP_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingDetail: false,
  dataDetailRecap: [],
}

export default function detailRecap(state = initialState, action) {
  switch (action.type) {
    case DETAIL_RECAP_REQUEST:
      return {
        ...state,
        isFetchingDetail: true,
      }
    case DETAIL_RECAP_SUCCESS:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: null,
        dataDetailRecap: action.data.data,
      }
    case DETAIL_RECAP_FAILURE:
      return {
        ...state,
        isFetchingDetail: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

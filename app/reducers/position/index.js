import {
  GET_POSITION_REQUEST,
  GET_POSITION_SUCCESS,
  GET_POSITION_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetchingPosition: false,
  dataPosition: [],
}

export default function position(state = initialState, action) {
  switch (action.type) {
    case GET_POSITION_REQUEST:
      return {
        ...state,
        isFetchingPosition: true,
      }
    case GET_POSITION_SUCCESS:
      return {
        ...state,
        isFetchingPosition: false,
        errorMessage: null,
        dataPosition: action.data.data.data,
      }
    case GET_POSITION_FAILURE:
      return {
        ...state,
        isFetchingPosition: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

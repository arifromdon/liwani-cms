import {
  CREATE_ABSENT_REQUEST,
  CREATE_ABSENT_SUCCESS,
  CREATE_ABSENT_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
  dataCreateAbsent: [],
  messageCreate: ''
}

export default function createAbsent(state = initialState, action) {
  switch (action.type) {
    case CREATE_ABSENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case CREATE_ABSENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messageCreate: null,
        dataCreateAbsent: action.data.data,
      }
    case CREATE_ABSENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        messageCreate: action.errorMessage,
      }
    default:
      return state
  }
}

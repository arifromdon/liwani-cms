import {
  DATA_PROVINCE_REQUEST,
  DATA_PROVINCE_SUCCESS,
  DATA_PROVINCE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loading: false,
  errorMessage: ''
}

export default function province(state = initialState, action) {
  switch (action.type) {
    case DATA_PROVINCE_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: action.errorMessage,
      }
    case DATA_PROVINCE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataProvince: action.data,
      }
    case DATA_PROVINCE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

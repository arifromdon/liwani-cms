import {
  DATA_SUB_DISTRICT_REQUEST,
  DATA_SUB_DISTRICT_SUCCESS,
  DATA_SUB_DISTRICT_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loading: false,
  errorMessage: ''
}

export default function subDistrict(state = initialState, action) {
  switch (action.type) {
    case DATA_SUB_DISTRICT_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: action.errorMessage,
      }
    case DATA_SUB_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSubDistrict: action.data,
      }
    case DATA_SUB_DISTRICT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

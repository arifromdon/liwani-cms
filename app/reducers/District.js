import {
  DATA_DISTRICT_REQUEST,
  DATA_DISTRICT_SUCCESS,
  DATA_DISTRICT_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loading: false,
  errorMessage: ''
}

export default function district(state = initialState, action) {
  switch (action.type) {
    case DATA_DISTRICT_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: action.errorMessage,
      }
    case DATA_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        dataDistrict: action.data,
      }
    case DATA_DISTRICT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

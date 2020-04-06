import {
  LOGO_COMPANY_REQUEST,
  LOGO_COMPANY_SUCCESS,
  LOGO_COMPANY_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  isFetching: false,
}

export default function logoCompany(state = initialState, action) {
  switch (action.type) {
    case LOGO_COMPANY_REQUEST:
      return {
        ...state,
        isFetching: true,
        logoCompany: []
      }
    case LOGO_COMPANY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        logoCompany: action.logoCompany,
      }
    case LOGO_COMPANY_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

import {
  EXPORT_PRICE_REQUEST,
  EXPORT_PRICE_SUCCESS,
  EXPORT_PRICE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loadingExport: false,
  errorMessageExport: ''
}

export default function exportPrice(state = initialState, action) {
  switch (action.type) {
    case EXPORT_PRICE_REQUEST:
      return {
        ...state,
        loadingExport: true,
        errorMessageExport: action.errorMessage,
      }
    case EXPORT_PRICE_SUCCESS:
      return {
        ...state,
        loadingExport: false,
        dataExportPrice: action.data,
      }
    case EXPORT_PRICE_FAILURE:
      return {
        ...state,
        loadingExport: false,
        errorMessageExport: action.errorMessage,
      }
    default:
      return state
  }
}

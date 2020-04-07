import {
  IMPORT_PRICE_REQUEST,
  IMPORT_PRICE_SUCCESS,
  IMPORT_PRICE_FAILURE,
} from 'constants/ActionTypes'

const initialState = {
  loadingImport: false,
  errorMessageImport: ''
}

export default function importPrice(state = initialState, action) {
  switch (action.type) {
    case IMPORT_PRICE_REQUEST:
      return {
        ...state,
        loadingImport: true,
        errorMessageImport: action.errorMessage,
      }
    case IMPORT_PRICE_SUCCESS:
      return {
        ...state,
        loadingImport: false,
        dataImportPrice: action.data,
      }
    case IMPORT_PRICE_FAILURE:
      return {
        ...state,
        loadingImport: false,
        errorMessageImport: action.errorMessage,
      }
    default:
      return state
  }
}

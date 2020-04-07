import API from 'utils/API'
import {
  IMPORT_PRICE_REQUEST,
  IMPORT_PRICE_SUCCESS,
  IMPORT_PRICE_FAILURE,
  EXPORT_PRICE_REQUEST,
  EXPORT_PRICE_SUCCESS,
  EXPORT_PRICE_FAILURE,
  EDIT_PRICE_REQUEST,
  EDIT_PRICE_SUCCESS,
  EDIT_PRICE_FAILURE
} from 'constants/ActionTypes'

// Action dispatch import price
export const importPriceRequest = () => ({
  type: IMPORT_PRICE_REQUEST,
})

export const importPriceSuccess = data => ({
  type: IMPORT_PRICE_SUCCESS,
  data: data,
})

export const importPriceFailure = errorMessage => ({
  type: IMPORT_PRICE_FAILURE,
  errorMessage,
})

// Action fetching export price
export const exportPriceRequest = () => ({
  type: EXPORT_PRICE_REQUEST,
})

export const exportPriceSuccess = data => ({
  type: EXPORT_PRICE_SUCCESS,
  data: data,
})

export const exportPriceFailure = errorMessage => ({
  type: EXPORT_PRICE_FAILURE,
  errorMessage,
})

// Action edit price
export const editPriceRequest = () => ({
  type: EDIT_PRICE_REQUEST,
})

export const editPriceSuccess = data => ({
  type: EDIT_PRICE_SUCCESS,
  data: data,
})

export const editPriceFailure = errorMessage => ({
  type: EDIT_PRICE_FAILURE,
  errorMessage,
})

export const dispatchImportPriceRequest = (params) => (
  (dispatch) => {
    dispatch(importPriceRequest())
    const url = '/prod/upload'

    return API.post(url, params).then(
      (response) => {
        if (response.data.status) {
          dispatch(importPriceSuccess(response.data.data))
        } else {
          dispatch(importPriceFailure(response.data.message))
        }
      },
    ).catch((err) => {
      dispatch(importPriceFailure(err.message)) // eslint-disable-line no-console
    })
  }
)

export const fetchingExportPriceRequest = (params) => (
  (dispatch) => {
    dispatch(exportPriceRequest())
    const url = '/prod/export'

    return API.get(url).then(
      (response) => {
        if (response.data.status) {
          dispatch(exportPriceSuccess(response.data.data))
        } else {
          dispatch(exportPriceFailure(response.data.message))
        }
      },
    ).catch((err) => {
      dispatch(exportPriceFailure(err.message)) // eslint-disable-line no-console
    })
  }
)

export const dispatchEditPriceRequest = (params) => (
  (dispatch) => {
    dispatch(editPriceRequest())
    const url = `/prod/edit/${params}`

    return API.post(url, params).then(
      (response) => {
        if (response.data.status) {
          dispatch(editPriceSuccess(response.data.data))
        } else {
          dispatch(editPriceFailure(response.data.message))
        }
      },
    ).catch((err) => {
      dispatch(editPriceFailure(err.message)) // eslint-disable-line no-console
    })
  }
)
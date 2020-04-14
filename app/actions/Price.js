import API from 'utils/API'
import { message } from 'antd'
import {
  IMPORT_PRICE_REQUEST,
  IMPORT_PRICE_SUCCESS,
  IMPORT_PRICE_FAILURE,
  EXPORT_PRICE_REQUEST,
  EXPORT_PRICE_SUCCESS,
  EXPORT_PRICE_FAILURE,
  EDIT_PRICE_REQUEST,
  EDIT_PRICE_SUCCESS,
  EDIT_PRICE_FAILURE,
  PRICE_BY_LOCATION_REQUEST,
  PRICE_BY_LOCATION_SUCCESS,
  PRICE_BY_LOCATION_FAILURE
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

// Action get data price by location
export const getPriceByLocationRequest = () => ({
  type: PRICE_BY_LOCATION_REQUEST,
})

export const getPriceByLocationSuccess = data => ({
  type: PRICE_BY_LOCATION_SUCCESS,
  data: data,
})

export const getPriceByLocationFailure = errorMessage => ({
  type: PRICE_BY_LOCATION_FAILURE,
  errorMessage,
})

export const dispatchImportPriceRequest = (params) => (
  (dispatch) => {
    dispatch(importPriceRequest())
    const url = '/prod/upload'

    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(importPriceSuccess(response.data.product))
          message.success(response.data.meta.message)
        } else {
          dispatch(importPriceFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(importPriceFailure(err.message)) // eslint-disable-line no-console
      message.error(err.message)
    })
  }
)

export const fetchingExportPriceRequest = (params) => (
  (dispatch) => {
    dispatch(exportPriceRequest())
    const url = '/prod/export'

    return API.get(url).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(exportPriceSuccess(response.data.price))
          message.success(response.data.meta.message)
        } else {
          dispatch(exportPriceFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(exportPriceFailure(err.message)) // eslint-disable-line no-console
      message.error(err.message)
    })
  }
)

export const dispatchEditPriceRequest = (params) => (
  (dispatch) => {
    dispatch(editPriceRequest())
    const url = `/prod/edit/${params.id}`

    return API.post(url, params.form).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(editPriceSuccess(response.data.data))
          message.success(response.data.meta.message)
        } else {
          dispatch(editPriceFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(editPriceFailure(err.message)) // eslint-disable-line no-console
      message.error(err.message)
    })
  }
)

export const fetchPriceByLocationRequest = (params) => (
  (dispatch) => {
    dispatch(getPriceByLocationRequest())
    const url = '/prod/price'
    
    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          const arr = []
          arr.push(response.data.data)
          dispatch(getPriceByLocationSuccess(arr))
          message.success(response.data.meta.message)
        } else {
          dispatch(getPriceByLocationFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(getPriceByLocationFailure(err.message)) // eslint-disable-line no-console
      message.error(err.message)
    })
  }
)
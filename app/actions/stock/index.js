import API from 'utils/API'
import {
  LIST_STOCK_REQUEST,
  LIST_STOCK_SUCCESS,
  LIST_STOCK_FAILURE,
} from 'constants/ActionTypes'

// Action get data stock
export const listStockRequest = () => ({
  type: LIST_STOCK_REQUEST,
})

export const listStockSuccess = data => ({
  type: LIST_STOCK_SUCCESS,
  data: data,
})

export const listStockFailure = errorMessage => ({
  type: LIST_STOCK_FAILURE,
  errorMessage,
})

export const fetchStock = () => (
  (dispatch) => {
    dispatch(listStockRequest())
    const url = ''

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listStockSuccess())
      } else {
        dispatch(listStockFailure())
      }
    }).catch((err) => {
      dispatch(listStockFailure()) // eslint-disable-line no-console
    })
  }
)

export const createStock = (params) => (
  (dispatch) => {
    dispatch(listStockRequest())
    const url = ''

    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(response.data.data)
        } else {
          dispatch(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(response.data.meta.message) // eslint-disable-line no-console
    })
  }
)

export const updateStock = params => (
  (dispatch) => {
    dispatch(listStockRequest())
    const url = ''

    return API.put(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(response.data.data)
        } else {
          dispatch(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(response.data.meta.message) // eslint-disable-line no-console
    })
  }
)

export const deleteStock = id => (
  (dispatch) => {
    dispatch(listStockRequest())
    const url = ``

    const requestDeleteStock = new Promise((resolve, reject) => {
      API.delete(url).then((response) => {
        if (response.data.meta.status) {
          resolve(response.data.data)
        } else {
          reject(response.data.meta.message)
        }
      }).catch((err) => {
        reject(err.message) // eslint-disable-line no-console
      })
    })
    return requestDeleteStock
  }
)

import API from 'utils/API'
import {
  LIST_STOCK_REQUEST,
  LIST_STOCK_SUCCESS,
  LIST_STOCK_FAILURE,
  DETAIL_STOCK_REQUEST,
  DETAIL_STOCK_SUCCESS,
  DETAIL_STOCK_FAILURE,
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

// Action get detail data stock
export const detailStockRequest = () => ({
  type: DETAIL_STOCK_REQUEST,
})

export const detailStockSuccess = data => ({
  type: DETAIL_STOCK_SUCCESS,
  data: data,
})

export const detailStockFailure = errorMessage => ({
  type: DETAIL_STOCK_FAILURE,
  errorMessage,
})


export const fetchStock = (params) => (
  (dispatch) => {
    dispatch(listStockRequest())
    const url = `/api/v1/stock${params}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listStockSuccess(response.data))
      } else {
        dispatch(listStockFailure(response.data.meta.status))
      }
    }).catch((err) => {
      dispatch(listStockFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const fetchDetailStock = (id) => (
  (dispatch) => {
    dispatch(detailStockRequest())
    const url = `/api/v1/stock/show/${id}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(detailStockSuccess(response.data.data))
      } else {
        dispatch(listStockFailure(response.data.meta.message))
      }
    }).catch((err) => {
      dispatch(detailStockFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const createStock = (params) => (
  (dispatch) => {
    dispatch(listStockRequest())
    const url = '/api/v1/stock/create'

    return API.post(url, params).then(
      (response) => {
        console.log('response: ', response)
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
    const url = `/api/v1/stock/update/${params.id}`

    return API.post(url, params.data).then(
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
    const url = `/api/v1/stock/delete/${id}`

    const requestDeleteStock = new Promise((resolve, reject) => {
      API.delete(url).then((response) => {
        if (response.data.meta.status) {
          resolve(response.data.data)
        } else {
          reject(response.data.meta.message)
        }
      }).catch((err) => {
        reject(err) // eslint-disable-line no-console
      })
    })
    return requestDeleteStock
  }
)

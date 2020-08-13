import API from 'utils/API'
import { message } from 'antd'
import {
  LIST_DEDUCTION_REQUEST,
  LIST_DEDUCTION_SUCCESS,
  LIST_DEDUCTION_FAILURE,
  DETAIL_DEDUCTION_REQUEST,
  DETAIL_DEDUCTION_SUCCESS,
  DETAIL_DEDUCTION_FAILURE,
  CREATE_DEDUCTION_REQUEST,
  CREATE_DEDUCTION_SUCCESS,
  CREATE_DEDUCTION_FAILURE,
} from 'constants/ActionTypes'

// Action get data stock
export const listDeductionRequest = () => ({
  type: LIST_DEDUCTION_REQUEST,
})

export const listDeductionSuccess = data => ({
  type: LIST_DEDUCTION_SUCCESS,
  data: data,
})

export const listDeductionFailure = errorMessage => ({
  type: LIST_DEDUCTION_FAILURE,
  errorMessage,
})

// Action get detail data Deduction
export const detailDeductionRequest = () => ({
  type: DETAIL_DEDUCTION_REQUEST,
})

export const detailDeductionSuccess = data => ({
  type: DETAIL_DEDUCTION_SUCCESS,
  data: data,
})

export const detailDeductionFailure = errorMessage => ({
  type: DETAIL_DEDUCTION_FAILURE,
  errorMessage,
})

// Action get create data Deduction
export const createDeductionRequest = () => ({
  type: CREATE_DEDUCTION_REQUEST,
})

export const createDeductionSuccess = data => ({
  type: CREATE_DEDUCTION_SUCCESS,
  data: data,
})

export const createDeductionFailure = errorMessage => ({
  type: CREATE_DEDUCTION_FAILURE,
  errorMessage,
})


export const fetchDeduction = (params) => (
  (dispatch) => {
    dispatch(listDeductionRequest())
    const url = `/api/v1/deductions`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listDeductionSuccess(response.data))
      } else {
        dispatch(listDeductionFailure(response.data.meta.status))
      }
    }).catch((err) => {
      dispatch(listDeductionFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const fetchDetailStock = (id) => (
  (dispatch) => {
    dispatch(detailDeductionRequest())
    const url = `/api/v1/deductions/${id}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(detailDeductionSuccess(response.data.data))
      } else {
        dispatch(detailDeductionFailure(response.data.meta.message))
      }
    }).catch((err) => {
      dispatch(detailDeductionFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const createDeduction = (params) => (
  (dispatch) => {
    dispatch(createDeductionRequest())
    const url = '/api/v1/deductions/create'

    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(createDeductionSuccess(response.data.meta.message))
        } else {
          dispatch(createDeductionFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      console.log('err: ', err)
      dispatch(createDeductionFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const updateStock = params => (
  (dispatch) => {
    dispatch(listDeductionRequest())
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
    dispatch(listDeductionRequest())
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

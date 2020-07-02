import API from 'utils/API'
import {
  LIST_EMPLOYEE_REQUEST,
  LIST_EMPLOYEE_SUCCESS,
  LIST_EMPLOYEE_FAILURE,
} from 'constants/ActionTypes'

// Action get data employee
export const listEmployeeRequest = () => ({
  type: LIST_EMPLOYEE_REQUEST,
})

export const listEmployeeSuccess = data => ({
  type: LIST_EMPLOYEE_SUCCESS,
  data: data,
})

export const listEmployeeFailure = errorMessage => ({
  type: LIST_EMPLOYEE_FAILURE,
  errorMessage,
})

export const fetchEmployee = () => (
  (dispatch) => {
    dispatch(listEmployeeRequest())
    const url = ''

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listEmployeeSuccess())
      } else {
        dispatch(listEmployeeFailure())
      }
    }).catch((err) => {
      dispatch(listEmployeeFailure()) // eslint-disable-line no-console
    })
  }
)

export const createEmployee = (params) => (
  (dispatch) => {
    dispatch(listEmployeeRequest())
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

export const updateEmployee = params => (
  (dispatch) => {
    dispatch(listEmployeeRequest())
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

export const deleteEmployee = id => (
  (dispatch) => {
    dispatch(listEmployeeRequest())
    const url = ``

    const requestDeleteEmployee = new Promise((resolve, reject) => {
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
    return requestDeleteEmployee
  }
)


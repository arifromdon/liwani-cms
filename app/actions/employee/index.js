import API from 'utils/API'
import { message } from 'antd'
import { isEmpty } from 'lodash'
import {
  LIST_EMPLOYEE_REQUEST,
  LIST_EMPLOYEE_SUCCESS,
  LIST_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
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

// Action Create data employee
export const createEmployeeRequest = () => ({
  type: CREATE_EMPLOYEE_REQUEST,
})

export const createEmployeeSuccess = data => ({
  type: CREATE_EMPLOYEE_SUCCESS,
  data: data,
})

export const createEmployeeFailure = errorMessage => ({
  type: CREATE_EMPLOYEE_FAILURE,
  errorMessage,
})

// Action UPDATE data employee
export const updateEmployeeRequest = () => ({
  type: UPDATE_EMPLOYEE_REQUEST,
})

export const updateEmployeeSuccess = data => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  data: data,
})

export const updateEmployeeFailure = errorMessage => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  errorMessage,
})

export const fetchEmployee = (params) => (
  (dispatch) => {
    dispatch(listEmployeeRequest())
    const url = `/api/v1/employees${!isEmpty(params) ? params : ''}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listEmployeeSuccess(response.data))
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
    dispatch(createEmployeeRequest())
    const url = '/api/v1/employees/create'

    return API.post(url, params)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(createEmployeeSuccess(response.data))
        message.success(response.data.meta.message)
      } else {
        dispatch(createEmployeeFailure(response.data))
      }
    }).catch((err) => {
      dispatch(createEmployeeFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const updateEmployee = params => (
  (dispatch) => {
    dispatch(updateEmployeeRequest())
    const url = `/api/v1/employees/update/${params.id}`

    return API.post(url, params.data).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(updateEmployeeSuccess(response.data.data))
        } else {
          dispatch(updateEmployeeFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(updateEmployeeFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const deleteEmployee = id => (
  (dispatch) => {
    dispatch(listEmployeeRequest())
    const url = `/api/v1/employees/delete/${id}`

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


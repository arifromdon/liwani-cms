import API from 'utils/API'
import {
  LIST_RECAP_REQUEST,
  LIST_RECAP_SUCCESS,
  LIST_RECAP_FAILURE,
  EXPORT_RECAP_REQUEST,
  EXPORT_RECAP_SUCCESS,
  EXPORT_RECAP_FAILURE,
  DETAIL_RECAP_REQUEST,
  DETAIL_RECAP_SUCCESS,
  DETAIL_RECAP_FAILURE,
  HISTORY_RECAP_REQUEST,
  HISTORY_RECAP_SUCCESS,
  HISTORY_RECAP_FAILURE,
  EMPLOYEE_RECAP_REQUEST,
  EMPLOYEE_RECAP_SUCCESS,
  EMPLOYEE_RECAP_FAILURE,
} from 'constants/ActionTypes'

// Action get data employee
export const listRecapRequest = () => ({
  type: LIST_RECAP_REQUEST,
})

export const listRecapSuccess = data => ({
  type: LIST_RECAP_SUCCESS,
  data: data,
})

export const listRecapFailure = errorMessage => ({
  type: LIST_RECAP_FAILURE,
  errorMessage,
})

// Action export data Recap
export const exportRecapRequest = () => ({
  type: EXPORT_RECAP_REQUEST,
})

export const exportRecapSuccess = data => ({
  type: EXPORT_RECAP_SUCCESS,
  data: data,
})

export const exportRecapFailure = errorMessage => ({
  type: EXPORT_RECAP_FAILURE,
  errorMessage,
})

// Action data detail Recap
export const detailRecapRequest = () => ({
  type: DETAIL_RECAP_REQUEST,
})

export const detailRecapSuccess = data => ({
  type: DETAIL_RECAP_SUCCESS,
  data: data,
})

export const detailRecapFailure = errorMessage => ({
  type: DETAIL_RECAP_FAILURE,
  errorMessage,
})

// Action data HISTORY Recap
export const historyRecapRequest = () => ({
  type: HISTORY_RECAP_REQUEST,
})

export const historyRecapSuccess = data => ({
  type: HISTORY_RECAP_SUCCESS,
  data: data,
})

export const historyRecapFailure = errorMessage => ({
  type: HISTORY_RECAP_FAILURE,
  errorMessage,
})

// Action data HISTORY Recap Employee
export const employeeRecapRequest = () => ({
  type: EMPLOYEE_RECAP_REQUEST,
})

export const employeeRecapSuccess = data => ({
  type: EMPLOYEE_RECAP_SUCCESS,
  data: data,
})

export const employeeRecapFailure = errorMessage => ({
  type: EMPLOYEE_RECAP_FAILURE,
  errorMessage,
})

export const fetchRecap = () => (
  (dispatch) => {
    dispatch(listRecapRequest())
    const url = ''

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listRecapSuccess())
      } else {
        dispatch(listRecapFailure())
      }
    }).catch((err) => {
      dispatch(listRecapFailure()) // eslint-disable-line no-console
    })
  }
)

export const exportRecap = (params) => (
  (dispatch) => {
    dispatch(exportRecapRequest())
    const url = `/api/v1/recap/${params.target}`

    return API.post(url, params.data)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(exportRecapSuccess())
      } else {
        dispatch(exportRecapFailure())
      }
    }).catch((err) => {
      dispatch(exportRecapFailure()) // eslint-disable-line no-console
    })
  }
)

export const detailRecap = params => (
  (dispatch) => {
    dispatch(detailRecapRequest())
    const url = `/api/v1${params.target}`
    console.log('params: ', params)
    return API.post(url, params.date).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(detailRecapSuccess(response.data.data))
        } else {
          dispatch(detailRecapFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(detailRecapFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const historyRecapSalary = params => (
  (dispatch) => {
    dispatch(historyRecapRequest())
    const url = `/api/v1/recap/recap`
    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(historyRecapSuccess(response.data))
        } else {
          dispatch(historyRecapFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(historyRecapFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const historyRecapSalaryEmployee = params => (
  (dispatch) => {
    dispatch(employeeRecapRequest())
    const url = `/api/v1/recap/recap_per_employee/${params}`
    return API.get(url).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(employeeRecapSuccess(response.data))
        } else {
          dispatch(employeeRecapFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(employeeRecapFailure(err)) // eslint-disable-line no-console
    })
  }
)

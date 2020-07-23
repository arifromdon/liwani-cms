import API from 'utils/API'
import {
  LIST_SALARY_REQUEST,
  LIST_SALARY_SUCCESS,
  LIST_SALARY_FAILURE,
  EXPORT_SALARY_REQUEST,
  EXPORT_SALARY_SUCCESS,
  EXPORT_SALARY_FAILURE,
  DETAIL_SALARY_REQUEST,
  DETAIL_SALARY_SUCCESS,
  DETAIL_SALARY_FAILURE,
} from 'constants/ActionTypes'

// Action get data salary
export const listSalaryRequest = () => ({
  type: LIST_SALARY_REQUEST,
})

export const listSalarySuccess = data => ({
  type: LIST_SALARY_SUCCESS,
  data: data,
})

export const listSalaryFailure = errorMessage => ({
  type: LIST_SALARY_FAILURE,
  errorMessage,
})

// Action get export salary
export const exportSalaryRequest = () => ({
  type: EXPORT_SALARY_REQUEST,
})

export const exportSalarySuccess = data => ({
  type: EXPORT_SALARY_SUCCESS,
  data: data,
})

export const exportSalaryFailure = errorMessage => ({
  type: EXPORT_SALARY_FAILURE,
  errorMessage,
})

// Action get detail salary
export const detailSalaryRequest = () => ({
  type: DETAIL_SALARY_REQUEST,
})

export const detailSalarySuccess = data => ({
  type: DETAIL_SALARY_SUCCESS,
  data: data,
})

export const detailSalaryFailure = errorMessage => ({
  type: DETAIL_SALARY_FAILURE,
  errorMessage,
})

export const fetchSalary = (params) => (
  (dispatch) => {
    dispatch(listSalaryRequest())
    const url = `/api/v1/salary${params}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listSalarySuccess(response.data))
      } else {
        dispatch(listSalaryFailure(response.data.meta.message))
      }
    }).catch((err) => {
      dispatch(listSalaryFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const fetchDetailSalary = (params) => (
  (dispatch) => {
    dispatch(detailSalaryRequest())
    const url = `/api/v1/salary/show/${params}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(detailSalarySuccess(response.data.data))
      } else {
        dispatch(detailSalaryFailure(response.data.meta.message))
      }
    }).catch((err) => {
      dispatch(detailSalaryFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const exportSalary = (id) => (
  (dispatch) => {
    dispatch(exportSalaryRequest())
    const url = ``

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(exportSalarySuccess())
      } else {
        dispatch(exportSalaryFailure())
      }
    }).catch((err) => {
      dispatch(exportSalaryFailure()) // eslint-disable-line no-console
    })
  }
)

export const editSalary = params => (
  (dispatch) => {
    dispatch(listSalaryRequest())
    const url = `/api/v1/salary/update/${params.id}`

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

export const updateCashReceipt = params => (
  (dispatch) => {
    dispatch(listSalaryRequest())
    const url = `/api/v1/salary/update/cash_receipt/${params.id}`

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

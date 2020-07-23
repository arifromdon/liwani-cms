import API from 'utils/API'
import { message } from 'antd'
import {
  LIST_ABSENT_REQUEST,
  LIST_ABSENT_SUCCESS,
  LIST_ABSENT_FAILURE,
  CREATE_ABSENT_REQUEST,
  CREATE_ABSENT_SUCCESS,
  CREATE_ABSENT_FAILURE,
} from 'constants/ActionTypes'

// Action get data absent
export const listAbsentRequest = () => ({
  type: LIST_ABSENT_REQUEST,
})

export const listAbsentSuccess = data => ({
  type: LIST_ABSENT_SUCCESS,
  data: data,
})

export const listAbsentFailure = errorMessage => ({
  type: LIST_ABSENT_FAILURE,
  errorMessage,
})

// Action handle create absent
export const createAbsentRequest = () => ({
  type: CREATE_ABSENT_REQUEST,
})

export const createAbsentSuccess = data => ({
  type: CREATE_ABSENT_SUCCESS,
  data: data,
})

export const createAbsentFailure = errorMessage => ({
  type: CREATE_ABSENT_FAILURE,
  errorMessage,
})

export const fetchAbsent = (params) => (
  (dispatch) => {
    dispatch(listAbsentRequest())
    const url = `/api/v1/absent${params}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listAbsentSuccess(response.data))
      } else {
        dispatch(listAbsentFailure())
      }
    }).catch((err) => {
      dispatch(listAbsentFailure()) // eslint-disable-line no-console
    })
  }
)

export const createAbsent = (params) => (
  (dispatch) => {
    dispatch(createAbsentRequest())
    const url = '/api/v1/absent/create'

    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(createAbsentSuccess(response.data.data))
          message.success(response.data.meta.message)
        } else {
          dispatch(createAbsentFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(createAbsentFailure(err.response.data.meta.message)) // eslint-disable-line no-console
      message.error(err.response.data.meta.message)
    })
  }
)

export const updateAbsent = params => (
  (dispatch) => {
    dispatch(listAbsentRequest())
    const url = `/api/v1/absent/update/${params.id}`
    console.log('params : ', params)
    return API.post(url, params.data).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(response.data.data)
        } else {
          dispatch(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(err) // eslint-disable-line no-console
    })
  }
)

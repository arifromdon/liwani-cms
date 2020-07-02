import API from 'utils/API'
import {
  LIST_ABSENT_REQUEST,
  LIST_ABSENT_SUCCESS,
  LIST_ABSENT_FAILURE,
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

export const fetchAbsent = () => (
  (dispatch) => {
    dispatch(listAbsentRequest())
    const url = ''

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listAbsentSuccess())
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
    dispatch(listAbsentRequest())
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

export const updateAbsent = params => (
  (dispatch) => {
    dispatch(listAbsentRequest())
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

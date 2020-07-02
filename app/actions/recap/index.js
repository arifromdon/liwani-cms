import API from 'utils/API'
import {
  LIST_RECAP_REQUEST,
  LIST_RECAP_SUCCESS,
  LIST_RECAP_FAILURE,
  EXPORT_RECAP_REQUEST,
  EXPORT_RECAP_SUCCESS,
  EXPORT_RECAP_FAILURE,
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

export const exportRecap = (id) => (
  (dispatch) => {
    dispatch(exportRecapRequest())
    const url = ``

    return API.get(url)
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

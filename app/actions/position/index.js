import API from 'utils/API'
import { message } from 'antd'
import {
  GET_POSITION_REQUEST,
  GET_POSITION_SUCCESS,
  GET_POSITION_FAILURE,
  CREATE_POSITION_REQUEST,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION_FAILURE,
} from 'constants/ActionTypes'

// Action get data position
export const listPositionRequest = () => ({
  type: GET_POSITION_REQUEST,
})

export const listPositionSuccess = data => ({
  type: GET_POSITION_SUCCESS,
  data: data,
})

export const listPositionFailure = errorMessage => ({
  type: GET_POSITION_FAILURE,
  errorMessage,
})

// Action create data position
export const createPositionRequest = () => ({
  type: CREATE_POSITION_REQUEST,
})

export const createPositionSuccess = data => ({
  type: CREATE_POSITION_SUCCESS,
  data: data,
})

export const createPositionFailure = errorMessage => ({
  type: CREATE_POSITION_FAILURE,
  errorMessage,
})


export const fetchPosition = (params) => (
  (dispatch) => {
    dispatch(listPositionRequest())
    const url = `/api/v1/positions`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(listPositionSuccess(response.data))
      } else {
        dispatch(listPositionFailure())
      }
    }).catch((err) => {
      dispatch(listPositionFailure()) // eslint-disable-line no-console
    })
  }
)

export const createPosition = (params) => (
  (dispatch) => {
    dispatch(createPositionRequest())
    const url = `/api/v1/positions/create`

    return API.post(url, params)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(createPositionSuccess(response.data))
      } else {
        dispatch(createPositionFailure())
      }
    }).catch((err) => {
      dispatch(createPositionFailure()) // eslint-disable-line no-console
    })
  }
)



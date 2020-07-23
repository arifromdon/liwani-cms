import API from 'utils/API'
import history from 'utils/history'
import { message } from 'antd'
import {
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAILURE,
} from 'constants/ActionTypes'

// Action get token forgot password
export const forgotPassRequest = () => ({
  type: FORGOT_PASS_REQUEST,
})

export const forgotPassSuccess = data => ({
  type: FORGOT_PASS_SUCCESS,
  data: data,
})

export const forgotPassFailure = errorMessage => ({
  type: FORGOT_PASS_FAILURE,
  errorMessage,
})

// Action check token forgot password
export const checkTokenRequest = () => ({
  type: CHECK_TOKEN_REQUEST,
})

export const checkTokenSuccess = data => ({
  type: CHECK_TOKEN_SUCCESS,
  data: data,
})

export const checkTokenFailure = errorMessage => ({
  type: CHECK_TOKEN_FAILURE,
  errorMessage,
})

// Action check token forgot password
export const resetPassRequest = () => ({
  type: RESET_PASS_REQUEST,
})

export const resetPassSuccess = data => ({
  type: RESET_PASS_SUCCESS,
  data: data,
})

export const resetPassFailure = errorMessage => ({
  type: RESET_PASS_FAILURE,
  errorMessage,
})

export const requestForgotPassword = (params) => (
  (dispatch) => {
    dispatch(forgotPassRequest())
    const url = `/api/v1/user/request_forgot`

    return API.post(url, params)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(forgotPassSuccess(response.data))
      } else {
        dispatch(forgotPassFailure(response.data.meta.message))
      }
    }).catch((err) => {
      dispatch(forgotPassFailure(err)) // eslint-disable-line no-console
    })
  }
)

export const requestCheckToken = (params) => (
  (dispatch) => {
    dispatch(checkTokenRequest())
    const url = `/api/v1/user/check_token/${params}`

    return API.get(url)
    .then((response) => {
      if (response.data.meta.code === 200) {
        dispatch(checkTokenSuccess(response.data.meta.message))
        message.success(response.data.meta.message)
      } else {
        dispatch(checkTokenFailure(response.data.meta.message))
        message.error(response.data.meta.message)
        history.push('/')
      }
    }).catch((err) => {
      dispatch(checkTokenFailure(err)) // eslint-disable-line no-console
      message.error("Token tidak valid, silahkan ulangi untuk mendapatkan token valid")
      history.push('/')
    })
  }
)

export const resetPassword = (params) => (
  (dispatch) => {
    dispatch(resetPassRequest())
    const url = `/api/v1/user/reset_password`

    return API.post(url, params)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(resetPassSuccess(response.data.meta.message))
        history.push('/')
      } else {
        dispatch(resetPassFailure(response.data.meta.message))
      }
    }).catch((err) => {
      console.log(err)
      dispatch(resetPassFailure(err)) // eslint-disable-line no-console
    })
  }
)
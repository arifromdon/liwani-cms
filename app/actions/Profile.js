import API from 'utils/API'
import history from 'utils/history'
import { message } from 'antd'
import {
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
} from 'constants/ActionTypes'

export const forgotPasswordRequest = () => ({
  type: FORGOT_PASS_REQUEST,
})

export const forgotPasswordSuccess = data => ({
  type: FORGOT_PASS_SUCCESS,
  data: data,
})

export const forgotPasswordFailure = errorMessage => ({
  type: FORGOT_PASS_FAILURE,
  errorMessage,
})

export const fetchForgotPassword = (params) => (
  (dispatch) => {
    dispatch(forgotPasswordRequest())
    const url = '/admin/forgot'

    return API.patch(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(forgotPasswordSuccess(response.data.data))
          message.success(response.data.meta.message)
          history.push('/')
        } else {
          dispatch(forgotPasswordFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(forgotPasswordFailure(err.message)) // eslint-disable-line no-console
    })
  }
)
import API from 'utils/API'
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
        if (response.data.status) {
          dispatch(forgotPasswordSuccess(response.data.data))
        } else {
          dispatch(forgotPasswordFailure(response.data.message))
        }
      },
    ).catch((err) => {
      dispatch(forgotPasswordFailure(err.message)) // eslint-disable-line no-console
    })
  }
)
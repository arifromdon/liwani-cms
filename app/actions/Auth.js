import Cookies from 'js-cookie'
import { isEmpty } from 'lodash'
import { purgeStoredState } from 'redux-persist'
import { mainPersistConfig } from 'store/configureStore'
import history from 'utils/history'
import config from 'app/config'
import Browser from 'utils/Browser'
import API from 'utils/API'

import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  UPDATE_AUTH_CURRENT_USER,
  STATUS_CURRENT_USER,
} from 'constants/ActionTypes'

export const authenticateUserRequest = () => ({
  type: AUTHENTICATE_USER_REQUEST,
})

export const authenticateUserSuccess = data => ({
  type: AUTHENTICATE_USER_SUCCESS,
  currentUser: data,
})

export const statusUserSuccess = data => ({
  type: STATUS_CURRENT_USER,
  typeUser: data,
})

export const authenticateUserFailure = errorMessage => ({
  type: AUTHENTICATE_USER_FAILURE,
  errorMessage,
})

export const updateAuthCurrentUser = currentUser => ({
  type: UPDATE_AUTH_CURRENT_USER,
  currentUser,
})

export const removeToken = () => {
  Cookies.remove(config.auth_cookie_name, { path: '/', domain: Browser.getRootDomain() })
}

export const redirectToLogin = () => (
  Browser.setWindowHref('/')
)

export const getAccessToken = () => (
  Cookies.get(config.auth_cookie_name)
)

export const loginUser = data => (
  (dispatch) => {
    dispatch(authenticateUserSuccess(data.token))
    dispatch(statusUserSuccess(data.user))

    Cookies.set(config.auth_cookie_name, data.token, {
      path: '/',
      domain: Browser.getRootDomain(),
    })

    localStorage.setItem("user", data.user.status);

    history.push('/dashboard')
  }
)

export const authenticateByCredentials = (params) => (
  (dispatch) => {
    dispatch(authenticateUserRequest())
    const url = '/api/v1/auth/token/request'

    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(loginUser(response.data.data.user))
        } else {
          dispatch(updateAuthCurrentUser(null))
          dispatch(authenticateUserFailure(response.data.message))
        }
      },
    ).catch((err) => {
      dispatch(authenticateUserFailure(err.message)) // eslint-disable-line no-console
    })
  }
)

export const authenticateByToken = () => (
  (dispatch) => {
    const accessToken = getAccessToken()

    if (isEmpty(accessToken)) {
      return redirectToLogin()
    }

    dispatch(authenticateUserRequest())

    return API.post(
      '/auth/authorization',
      { token: accessToken },
    ).then(
      (response) => {
        if (response.data.status) {
          dispatch(authenticateUserSuccess({ access_token: accessToken }))
        } else {
          dispatch(authenticateUserFailure())
          redirectToLogin()
        }
      },
    ).catch((err) => {
      console.error(err) // eslint-disable-line no-console
    })
  }
)

export const clearCurrentUser = () => (
  () => {
    purgeStoredState(mainPersistConfig).then(() => {
      removeToken()
      Browser.setWindowHref('/')
    })
  }
)

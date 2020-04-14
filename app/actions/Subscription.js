import API from 'utils/API'
import { message } from 'antd'
import {
  LIST_SUBSCRIPTION_REQUEST,
  LIST_SUBSCRIPTION_SUCCESS,
  LIST_SUBSCRIPTION_FAILURE,
  APPROVAL_SUBSCRIPTION_REQUEST,
  APPROVAL_SUBSCRIPTION_SUCCESS,
  APPROVAL_SUBSCRIPTION_FAILURE
} from 'constants/ActionTypes'

// Action get list subscription
export const listSubscriptionRequest = () => ({
  type: LIST_SUBSCRIPTION_REQUEST,
})

export const listSubscriptionSuccess = data => ({
  type: LIST_SUBSCRIPTION_SUCCESS,
  data: data,
})

export const listSubscriptionFailure = errorMessage => ({
  type: LIST_SUBSCRIPTION_FAILURE,
  errorMessage,
})

// Action patch list subscription
export const approvalSubscriptionRequest = () => ({
  type: APPROVAL_SUBSCRIPTION_REQUEST,
})

export const approvalSubscriptionSuccess = data => ({
  type: APPROVAL_SUBSCRIPTION_SUCCESS,
  data: data,
})

export const approvalSubscriptionFailure = errorMessage => ({
  type: APPROVAL_SUBSCRIPTION_FAILURE,
  errorMessage,
})

export const getListSubscription = (params) => (
  (dispatch) => {
    dispatch(listSubscriptionRequest())
    const url = '/subs/list'

    return API.post(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(listSubscriptionSuccess(response.data.subcription))
        } else {
          dispatch(listSubscriptionFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(listSubscriptionFailure(err.message)) // eslint-disable-line no-console
    })
  }
)

export const approvalSubscriptionPassword = (params) => (
  (dispatch) => {
    dispatch(approvalSubscriptionRequest())
    const url = `/subs/verify/${params}`

    return API.post(url).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(approvalSubscriptionSuccess(response.data.data))
          message.success(response.data.meta.message)
        } else {
          dispatch(approvalSubscriptionFailure(response.data.meta.message))
          message.error(response.data.meta.message)
        }
      },
    ).catch((err) => {
      dispatch(approvalSubscriptionFailure(err.message)) // eslint-disable-line no-console
    })
  }
)
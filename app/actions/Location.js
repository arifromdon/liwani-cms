import API from 'utils/API'
import {
  DATA_PROVINCE_REQUEST,
  DATA_PROVINCE_SUCCESS,
  DATA_PROVINCE_FAILURE,
  DATA_DISTRICT_REQUEST,
  DATA_DISTRICT_SUCCESS,
  DATA_DISTRICT_FAILURE,
  DATA_SUB_DISTRICT_REQUEST,
  DATA_SUB_DISTRICT_SUCCESS,
  DATA_SUB_DISTRICT_FAILURE
} from 'constants/ActionTypes'

// Action get data province
export const dataProvinceRequest = () => ({
  type: DATA_PROVINCE_REQUEST,
})

export const dataProvinceSuccess = data => ({
  type: DATA_PROVINCE_SUCCESS,
  data: data,
})

export const dataProvinceFailure = errorMessage => ({
  type: DATA_PROVINCE_FAILURE,
  errorMessage,
})

// Action get data district
export const dataDisctrictRequest = () => ({
  type: DATA_DISTRICT_REQUEST,
})

export const dataDisctrictSuccess = data => ({
  type: DATA_DISTRICT_SUCCESS,
  data: data,
})

export const dataDisctrictFailure = errorMessage => ({
  type: DATA_DISTRICT_FAILURE,
  errorMessage,
})

// Action get data sub-district
export const dataSubDisctrictRequest = () => ({
  type: DATA_SUB_DISTRICT_REQUEST,
})

export const dataSubDisctrictSuccess = data => ({
  type: DATA_SUB_DISTRICT_SUCCESS,
  data: data,
})

export const dataSubDisctrictFailure = errorMessage => ({
  type: DATA_SUB_DISTRICT_FAILURE,
  errorMessage,
})


export const fetchProvinceRequest = () => (
  (dispatch) => {
    dispatch(dataProvinceRequest())
    const url = '/loc/listprov'

    return API.get(url)
    .then((response) => {
      if (response.data.meta.status) {
        dispatch(dataProvinceSuccess(response.data.provinces))
      } else {
        dispatch(dataProvinceFailure(response.data.meta.message))
      }
    }).catch((err) => {
      dispatch(dataProvinceFailure(err.message)) // eslint-disable-line no-console
    })
  }
)

export const fetchDistrictRequest = (params) => (
  (dispatch) => {
    dispatch(dataDisctrictRequest())
    const url = '/loc/listcity'

    return API.get(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(dataDisctrictSuccess(response.data.cities))
        } else {
          dispatch(dataDisctrictFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(dataDisctrictFailure(err.message)) // eslint-disable-line no-console
    })
  }
)

export const fetchSubDistrictRequest = (params) => (
  (dispatch) => {
    dispatch(dataSubDisctrictRequest())
    const url = '/loc/listsubcity'

    return API.get(url, params).then(
      (response) => {
        if (response.data.meta.status) {
          dispatch(dataSubDisctrictSuccess(response.data.sub_cities))
        } else {
          dispatch(dataSubDisctrictFailure(response.data.meta.message))
        }
      },
    ).catch((err) => {
      dispatch(dataSubDisctrictFailure(err.message)) // eslint-disable-line no-console
    })
  }
)
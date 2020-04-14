import { combineReducers } from 'redux'
import site from 'reducers/Site'
import auth from './Auth'
import importPrice from './ImportPrice'
import exportPrice from './ExportPrice'
import editPrice from './EditPrice'
import forgotPassword from './Profile'
import priceByLocation from './PriceByLocation'
import subscription from './Subscription'
import province from './Province'
import district from './District'
import subDistrict from './SubDistrict'

export default combineReducers({
  site,
  auth,
  importPrice,
  exportPrice,
  editPrice,
  forgotPassword,
  priceByLocation,
  subscription,
  province,
  district,
  subDistrict
})

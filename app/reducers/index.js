import { combineReducers } from 'redux'
import site from 'reducers/Site'
import auth from './Auth'
import logoCompany from 'reducers/LogoCompany/LogoCompany'
import importPrice from './ImportPrice'
import exportPrice from './ExportPrice'
import editPrice from './EditPrice'
import forgotPassword from './Profile'

export default combineReducers({
  site,
  auth,
  logoCompany,
  importPrice,
  exportPrice,
  editPrice,
  forgotPassword
})

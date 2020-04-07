import { combineReducers } from 'redux'
import site from 'reducers/Site'
import auth from 'reducers/Auth'
import logoCompany from 'reducers/LogoCompany/LogoCompany'
import importPrice from 'reducers/ImportPrice'
import exportPrice from 'reducers/ExportPrice'
import editPrice from 'reducers/EditPrice'
import forgotPassword from 'reducers/Profile'

export default combineReducers({
  site,
  auth,
  logoCompany,
  importPrice,
  exportPrice,
  editPrice,
  forgotPassword
})

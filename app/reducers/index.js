import { combineReducers } from 'redux'
import site from 'reducers/Site'
import auth from 'reducers/Auth'
import logoCompany from 'reducers/LogoCompany/LogoCompany'

export default combineReducers({
  site,
  auth,
  logoCompany
})

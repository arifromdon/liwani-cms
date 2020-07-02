import { combineReducers } from 'redux'
import site from 'reducers/Site'
import auth from './Auth'
import stock from './stock'
import absent from './absent'
import salary from './salary'
import recap from './recap'

export default combineReducers({
  site,
  auth,
  stock,
  absent,
  salary,
  recap
})

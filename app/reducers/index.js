import { combineReducers } from 'redux'
import site from 'reducers/Site'
import auth from './Auth'
import stock from './stock'
import detailStock from './stock/detail'
import absent from './absent'
import createAbsent from './absent/create'
import salary from './salary'
import detailSalary from './salary/detail'
import recap from './recap'
import detailRecap from './recap/detailRecap'
import recapEmployee from './salary/employeeRecap'
import historyRecap from './recap/history'
import employee from './employees'
import createEmployee from './employees/createEmployee'
import updateEmployee from './employees/updateEmployee'
import resetPassword from './forgot/ResetPassword'
import checkToken from './forgot/CheckToken'
import forgot from './forgot'

export default combineReducers({
  site,
  auth,
  stock,
  absent,
  salary,
  recap,
  detailRecap,
  detailSalary,
  employee,
  createEmployee,
  updateEmployee,
  createAbsent,
  detailStock,
  resetPassword,
  checkToken,
  forgot,
  historyRecap,
  recapEmployee,
})

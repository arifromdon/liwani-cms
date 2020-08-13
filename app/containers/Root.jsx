import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Router, Route, Switch } from 'react-router-dom'
import history from 'utils/history'
import privateComponent from 'utils/hocs/privateComponent'
import publicComponent from 'utils/hocs/publicComponent'
import PublicLayout from 'containers/layouts/PublicLayout'
import PrivateLayout from 'containers/layouts/PrivateLayout'

import Login from 'containers/login/Login'
import NotFound from 'containers/NotFound'
import Dashboard from 'containers/dashboard'
import Deduction from 'containers/deduction'
import DetailDeduction from 'containers/deduction/detail'
import Recap from 'containers/recap'
import DetailRecap from 'containers/recap/detail'
import Absent from 'containers/absent'
import Salary from 'containers/salary'
import DetailSalary from 'containers/salary/detail'
import ExportSalary from 'containers/salary/export'
import Forgot from 'containers/forgot'
import CheckToken from 'containers/forgot/ResetPassword'

const PublicRoute = (props) => {
  const {
    component: Component,
    redirect,
    redirectPath,
    ...rest
  } = props

  const PublicLayoutView = publicComponent(PublicLayout, redirect, redirectPath)

  return (
    <Route
      {...rest}
      render={matchProps => (
        <PublicLayoutView>
          <Component {...matchProps} />
        </PublicLayoutView>
      )}
    />
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const PrivateLayoutView = privateComponent(PrivateLayout)

  return (
    <Route
      {...rest}
      render={matchProps => (
        <PrivateLayoutView>
          <Component {...matchProps} />
        </PrivateLayoutView>
      )}
    />
  )
}

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <Router history={history}>
        <Switch>
          <PublicRoute redirect exact path="/" component={Login} />
          <PublicRoute exact path="/forgot-password" component={Forgot} />
          <PublicRoute exact path="/forgot" component={CheckToken} />
          <PublicRoute exact path="/dashboard" component={Dashboard} />
          <PublicRoute exact path="/deduction" component={Deduction} />
          <PublicRoute exact path="/deduction/:id" component={DetailDeduction} />
          <PublicRoute exact path="/recap" component={Recap} />
          <PublicRoute exact path="/recap/:id" component={DetailRecap} />
          <PublicRoute exact path="/absent" component={Absent} />
          <PublicRoute exact path="/salary" component={Salary} />
          <PublicRoute exact path="/salary/:id" component={DetailSalary} />
          <PublicRoute exact path="/export/salary" component={ExportSalary} />
          <PublicRoute component={NotFound} />
        </Switch>
      </Router>

    </PersistGate>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.shape().isRequired,
  persistor: PropTypes.shape().isRequired,
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
}

PublicRoute.propTypes = {
  component: PropTypes.any,
  redirect: PropTypes.bool,
  redirectPath: PropTypes.string,
}

export default Root

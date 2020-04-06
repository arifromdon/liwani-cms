import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  compose,
  branch,
  mapProps,
  lifecycle,
} from 'recompose'

import { isEmpty, omit, identity } from 'lodash'
import { authenticateByToken } from 'actions/Auth'

export const mapStateToProps = (state) => {
  const {
    isAuthenticating,
    currentUser,
  } = isEmpty(state.root.auth)
    ? { isAuthenticating: false, currentUser: null }
    : state.root.auth

  return {
    isAuthenticating,
    currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateByToken: bindActionCreators(authenticateByToken, dispatch),
})

const privateComponent = (SecureComponent) => {
  const isAuthenticated = ({ isAuthenticating, currentUser }) => (
    !isAuthenticating && !!currentUser
  )

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    lifecycle({
      componentDidMount() {
        !isAuthenticated(this.props) && this.props.authenticateByToken() // eslint-disable-line no-unused-expressions
      },
    }),
    mapProps(
      props => omit(props, ['authenticateByToken']),
    ),
    branch(
      isAuthenticated,
      identity,
    ),
  )(SecureComponent)
}

export default privateComponent

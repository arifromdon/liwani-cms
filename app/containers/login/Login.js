import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import { compose, withHandlers } from 'recompose'
import { authenticateByCredentials } from 'actions/Auth'
import withForms from 'utils/hocs/withForms'
import LoginView from 'components/pages/login/Login'

// export function mapStateToProps(state) {
//   const {
//     isAuthenticating,
//     errorMessage,
//   } = isEmpty(state.root.auth)
//     ? { isAuthenticating: false, errorMessage: null }
//     : state.root.auth

//   return {
//     isAuthenticating,
//     errorMessage,
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   loginWithCredentials: bindActionCreators(authenticateByCredentials, dispatch),
// })

export default compose(
  // connect(
  //   mapStateToProps,
  //   mapDispatchToProps,
  // ),
  withForms(),
  withHandlers({
    onSubmit: props => (event) => {
      event.preventDefault()
      // props.loginWithCredentials(props.form)
    },
  }),
)(LoginView)

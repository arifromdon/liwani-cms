import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import { compose, withHandlers } from 'recompose'
import withForms from 'utils/hocs/withForms'
import ForgotPasswordView from 'components/pages/forgot'

// export function mapStateToProps(state) {
//   const {
//     loadingForgot,
//     errorMessageForgot,
//   } = isEmpty(state.root.auth)
//     ? { loadingForgot: false, errorMessageForgot: null }
//     : state.root.forgotPassword

//   return {
//     loadingForgot,
//     errorMessageForgot,
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   fetchForgotPassword: bindActionCreators(fetchForgotPassword, dispatch),
// })

export default compose(
  // connect(
  //   mapStateToProps,
  //   mapDispatchToProps,
  // ),
  // withForms(),
  // withHandlers({
  //   onSubmit: props => (event) => {
  //     event.preventDefault()
  //     props.fetchForgotPassword(props.form)
  //   },
  // }),
)(ForgotPasswordView)

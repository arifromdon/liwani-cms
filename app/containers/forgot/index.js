import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import { compose, withHandlers } from 'recompose'
import {
  requestForgotPassword,
  requestCheckToken,
  resetPassword
} from 'actions/forgot'
import withForms from 'utils/hocs/withForms'
import ForgotView from 'components/pages/forgot'

export function mapStateToProps(state) {
  const {
    isFetchingForgot,
    errorMessageForgot,
  } = state.root.forgot

  const {
    isFetchingCheck,
    errorMessageCheck,
  } = state.root.checkToken

  const {
    isFetchingReset,
    errorMessage,
  } = state.root.resetPassword

  return {
    isFetchingForgot,
    errorMessageForgot,
    isFetchingCheck,
    errorMessageCheck,
    isFetchingReset,
    errorMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  requestForgotPassword: bindActionCreators(requestForgotPassword, dispatch),
  requestCheckToken: bindActionCreators(requestCheckToken, dispatch),
  resetPassword: bindActionCreators(resetPassword, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withForms(),
  withHandlers({
    onSubmit: props => (event) => {
      event.preventDefault()
      props.requestForgotPassword({ "email" : props.form.email })
    },
  }),
)(ForgotView)

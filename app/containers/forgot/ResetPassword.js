import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import { compose, withHandlers, lifecycle, withState } from 'recompose'
import {
  resetPassword,
  requestCheckToken,
} from 'actions/forgot'
import withForms from 'utils/hocs/withForms'
import ResetPasswordView from 'components/pages/forgot/ResetPassword'

export function mapStateToProps(state) {
  const {
    isFetchingCheck,
    errorMessageCheck,
  } = state.root.checkToken

  const {
    isFetchingReset,
    errorMessage,
  } = state.root.resetPassword

  return {
    isFetchingReset,
    errorMessage,
    isFetchingCheck,
    errorMessageCheck,
  }
}

const mapDispatchToProps = dispatch => ({
  requestCheckToken: bindActionCreators(requestCheckToken, dispatch),
  resetPassword: bindActionCreators(resetPassword, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withForms(),
  withState('getTokenReset', 'setTokenReset', ''),
  withHandlers({
    onSubmit: props => (event) => {
      event.preventDefault()
      props.resetPassword({
        "password" : props.form.new_email,
        "password_confirmation" : props.form.confirm_email,
        "token" : props.getTokenReset
      })
    },
  }),
  lifecycle({
    componentWillMount() {
      const paramsPath = this.props.location.search
      let checkToken = paramsPath.substring(paramsPath.lastIndexOf('?') + 7)
      this.props.requestCheckToken(checkToken)
      this.props.setTokenReset(checkToken)
    }
  }),
)(ResetPasswordView)

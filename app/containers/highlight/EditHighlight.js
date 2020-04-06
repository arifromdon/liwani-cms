import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, withHandlers } from 'recompose'
import { clearCurrentUser } from 'actions/Auth'
import EditHighlight from '../../components/pages/highlight/EditHighlight'

export function mapStateToProps(state) {
  const {
    currentUser,
  } = state.root.auth

  return {
    currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(clearCurrentUser, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    onLogout: props => () => {
      props.logout()
    },
  }),
)(EditHighlight)

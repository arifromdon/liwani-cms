import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, withHandlers } from 'recompose'
import { clearCurrentUser } from 'actions/Auth'
import BlogView from '../../components/pages/blog/Blog'

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
)(BlogView)

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Browser from 'utils/Browser'

export const mapStateToProps = (state) => {
  const {
    currentUser,
  } = state.root.auth

  return {
    currentUser,
  }
}

const publicComponent = (Component, redirect = false, redirectPath = '/location') => compose(
  connect(
    mapStateToProps,
  ),
  lifecycle({
    componentDidMount() {
      if (!!this.props.currentUser && redirect) {
        Browser.setWindowHref(redirectPath)
      }
    },
  }),
)(Component)

export default publicComponent

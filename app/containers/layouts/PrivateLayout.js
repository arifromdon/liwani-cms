import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import PrivateLayoutView from 'components/layouts/PrivateLayout'

export default compose(
  withRouter,
)(PrivateLayoutView)

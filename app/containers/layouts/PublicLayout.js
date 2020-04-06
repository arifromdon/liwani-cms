import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import PublicLayoutView from 'components/layouts/PublicLayout'

export default compose(
  withRouter,
)(PublicLayoutView)

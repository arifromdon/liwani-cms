import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { message } from 'antd'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import {
  compose,
  withHandlers,
  lifecycle,
  withState
} from 'recompose'
import {
  fetchRecap,
  exportRecap
} from 'actions/recap'
import RecapView from 'components/pages/recap'

export function mapStateToProps(state) {
  const {
    isFetching,
    errorMessage,
    dataRecap,
    pagination,
  } = state.root.recap

  return {
    isFetching,
    errorMessage,
    dataRecap,
    pagination,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchRecap: bindActionCreators(fetchRecap, dispatch),
  exportRecap: bindActionCreators(exportRecap, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    handleExport: props => (data) => {
      if (data.field === 'salary') {
        props.exportRecap({ field: data.field, id: data.id })
      } else if (data.field === 'stock') {
        props.exportRecap({ field: data.field, id: data.id })
      } else if (data.field === 'all') {
        props.exportRecap({ field: data.field, id: data.id })
      }
    }
  }),
  // lifecycle({
  //   componentWillMount() {
  //     this.props.fetchRecap()
  //     this.props.setSubscription(!isEmpty(this.props.dataSubscription) && this.props.dataSubscription)
  //   }
  // }),
)(RecapView)
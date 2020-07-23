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
import { fetchDetailSalary } from 'actions/salary'
import ExportSalaryView from 'components/pages/salary/export'

export function mapStateToProps(state) {
  const {
    isFetchingDetail,
    dataDetailSalary,
  } = state.root.detailSalary

  return {
    isFetchingDetail,
    dataDetailSalary,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDetailSalary: bindActionCreators(fetchDetailSalary, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // withState('modalCreate', 'setModalCreate', false),
  // withState('getId', 'setGetId', ''),
  withHandlers({}),
  lifecycle({
    componentWillMount() {
      let pathTarget = this.props.location.pathname
      let getIdPathname = pathTarget.substring(pathTarget.lastIndexOf('/') + 1)
      this.props.fetchDetailSalary(getIdPathname)
    }
  }),
)(ExportSalaryView)
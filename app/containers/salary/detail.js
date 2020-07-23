import { connect } from 'react-redux'
import { isEmpty, first } from 'lodash'
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
import { historyRecapSalaryEmployee } from 'actions/recap'
import DetailSalaryView from 'components/pages/salary/detail'

export function mapStateToProps(state) {
  const {
    isFetchingEmployee,
    dataRecapEmployee,
  } = state.root.recapEmployee

  const {
    isFetchingDetail,
    dataDetailSalary,
  } = state.root.detailSalary

  const { typeUser } = state.root.auth

  return {
    isFetchingDetail,
    dataDetailSalary,
    isFetchingEmployee,
    dataRecapEmployee,
    typeUser,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDetailSalary: bindActionCreators(fetchDetailSalary, dispatch),
  historyRecapSalaryEmployee: bindActionCreators(historyRecapSalaryEmployee, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('getHours', 'setGetHours', ''),
  withHandlers({
    pxToMm: props => (px) => {
      return Math.floor(px/document.getElementById('myMm').offsetHeight);
    },
    mmToPx: props => (mm) => {
      return document.getElementById('myMm').offsetHeight*mm;
    },
    range: props => (start, end) => {
      return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
    },
    secondsToHms: props => () => {
      let second = !isEmpty(props.dataRecapEmployee) && first(props.dataRecapEmployee)
      let hours = Math.floor(second.work_hours / 3600);

      props.setGetHours(hours)
    },
  }),
  lifecycle({
    componentWillMount() {
      let pathTarget = this.props.location.pathname
      let getIdPathname = pathTarget.substring(pathTarget.lastIndexOf('/') + 1)
      this.props.fetchDetailSalary(getIdPathname)
      this.props.historyRecapSalaryEmployee(getIdPathname)
      this.props.secondsToHms()
    }
  }),
)(DetailSalaryView)
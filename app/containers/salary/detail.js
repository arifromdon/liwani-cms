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
import { fetchDeduction } from 'actions/deduction'
import { fetchDetailSalary } from 'actions/salary'
import { historyRecapSalary } from 'actions/recap'
import DetailSalaryView from 'components/pages/salary/detail'

export function mapStateToProps(state) {
  const {
    isFetching,
    dataDeduction,
    errorMessage,
  } = state.root.deduction

  const {
    isFetchingEmployee,
    dataRecapEmployee,
  } = state.root.recapEmployee

  const {
    isFetchingDetail,
    dataDetailSalary,
  } = state.root.detailSalary

  const {
    isFetchingHistory,
    dataHistoryRecap,
  } = state.root.historyRecap

  return {
    isFetchingDetail,
    dataDetailSalary,
    isFetchingEmployee,
    dataRecapEmployee,
    isFetchingHistory,
    dataHistoryRecap,
    isFetching,
    dataDeduction,
    errorMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDetailSalary: bindActionCreators(fetchDetailSalary, dispatch),
  historyRecapSalary: bindActionCreators(historyRecapSalary, dispatch),
  fetchDeduction: bindActionCreators(fetchDeduction, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('getHours', 'setGetHours', ''),
  withState('getHistoryRecap', 'setHistoryRecap', {}),
  withState('getDeduction', 'setDeduction', {}),
  withState('getTypeUser', 'setTypeUser', ''),
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
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1);

      const {
        fetchDetailSalary,
        historyRecapSalary,
        secondsToHms,
        dataHistoryRecap,
        setHistoryRecap,
        fetchDeduction,
        dataDeduction,
        setDeduction,
        setTypeUser,
      } = this.props

      setTypeUser(localStorage.getItem("user"))
      fetchDetailSalary(getIdPathname)
      historyRecapSalary({ month: moment(date).format("MMMM YYYY") })
      secondsToHms()
      fetchDeduction()

      const historyRecapNow = !isEmpty(dataHistoryRecap) && dataHistoryRecap.filter(item => item.employee_id === parseInt(getIdPathname))
      const getDataDeduction = !isEmpty(dataDeduction) && dataDeduction.filter(item => item.employee_id === parseInt(getIdPathname))
      setHistoryRecap(historyRecapNow)
      setDeduction(getDataDeduction)
    }
  }),
)(DetailSalaryView)
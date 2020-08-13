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
import { detailRecap, historyRecapSalary } from 'actions/recap'
import RecapView from 'components/pages/recap'

export function mapStateToProps(state) {
  const {
    isFetchingDetail,
    dataDetailRecap,
  } = state.root.detailRecap

  const {
    isFetchingHistory,
    dataHistoryRecap,
  } = state.root.historyRecap

  return {
    isFetchingDetail,
    dataDetailRecap,
    isFetchingHistory,
    dataHistoryRecap,
  }
}

const mapDispatchToProps = dispatch => ({
  detailRecap: bindActionCreators(detailRecap, dispatch),
  historyRecapSalary: bindActionCreators(historyRecapSalary, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('getTarget', 'setGetTarget', ''),
  withState('recapMonth', 'setRecapMonth', ''),
  withState('getMonth', 'setGetMonth', ''),
  withState('getCounting', 'setGetCounting', 0),
  withState('getTypeUser', 'setTypeUser', ''),
  withHandlers({
    handleDateRecap: props => (data) => {
      props.detailRecap({ date: { "date": moment(data).format("MMMM YYYY").toUpperCase() }, target: props.getTarget })
      props.historyRecapSalary({ month: moment(data).format("MMMM YYYY") })
      props.setGetMonth(moment(data).format("YYYY").toUpperCase())
    },
    handleExport: props => () => {
      props.detailRecap({ date: props.recapMonth, target: props.getTarget })
    },
    handleSelect: props => (data) => {
      if (data.field === 'province') {
        props.setProvinceSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'district') {
        props.setDistrictSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'subDistrict') {
        props.setSubDistrictSelected(!isEmpty(data) ? data.value : undefined)
      }
    },
    handleCounting: props => () => {
      props.setGetCounting(props.getCounting + 1)
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.setGetTarget(this.props.location.pathname)
      this.props.setTypeUser(localStorage.getItem("user"))
      // this.props.secondsToHms()
    }
  }),
)(RecapView)
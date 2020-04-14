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
  getListSubscription,
  approvalSubscriptionPassword
} from 'actions/Subscription'
import SubscriptionView from 'components/pages/subscription'

export function mapStateToProps(state) {
  const {
    loading,
    errorMessage,
    dataSubscription
  } = state.root.subscription

  return {
    loading,
    errorMessage,
    dataSubscription
  }
}
const mapDispatchToProps = dispatch => ({
  getListSubscription: bindActionCreators(getListSubscription, dispatch),
  approvalSubscriptionPassword: bindActionCreators(approvalSubscriptionPassword, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('subscription', 'setSubscription', []),
  withHandlers({
    onChange: props => (date) => {
      props.getListSubscription({ "period": !isEmpty(moment(date)) && moment(date).format("YYYY-MM") })
      props.setSubscription(props.dataSubscription)
    },
    handleApproval: props => (data) => {
      props.approvalSubscriptionPassword(data)
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.getListSubscription({ "period": moment().format("YYYY-MM") })
      this.props.setSubscription(!isEmpty(this.props.dataSubscription) && this.props.dataSubscription)
    }
  }),
)(SubscriptionView)
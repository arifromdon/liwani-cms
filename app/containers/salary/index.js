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
  fetchSalary,
  exportSalary,
  editSalary,
  updateCashReceipt,
} from 'actions/salary'
import withForms from 'utils/hocs/withForms'
import SalaryView from 'components/pages/salary'

export function mapStateToProps(state) {
  const {
    isFetching,
    errorMessage,
    dataSalary,
    pagination,
  } = state.root.salary

  return {
    isFetching,
    errorMessage,
    dataSalary,
    pagination,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchSalary: bindActionCreators(fetchSalary, dispatch),
  exportSalary: bindActionCreators(exportSalary, dispatch),
  editSalary: bindActionCreators(editSalary, dispatch),
  updateCashReceipt: bindActionCreators(updateCashReceipt, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('modalEditSallary', 'setModalEditSallary', false),
  withState('modalEditCashReceipt', 'setModalEditCashReceipt', false),
  withState('getId', 'setGetId', ''),
  withForms(),
  withHandlers({
    handleExport: props => (data) => {
      data.preventDefault()
      // props.exportSalary()
    },
    handleEditSalary: props => (data) => {
      data.preventDefault()
      // props.editSalary(props.getId)
    },
    handleEditCashReceipt: props => (data) => {
      data.preventDefault()
      // props.updateCashReceipt(props.getId)
    },
    handleModal: props => (data) => {
      if (data.field === 'edit') {
        props.setModalEditSallary(true)
        props.setGetId(data.id)
      } else if (data.field === 'cash_receipt') {
        props.setModalEditCashReceipt(true)
        props.setGetId(data.id)
      }
    },
    handleModalClose: props => (data) => {
      if (data.field === 'edit') {
        props.setModalEditSallary(false)
      } else if (data.field === 'cash_receipt') {
        props.setModalEditCashReceipt(false)
      }
    },
  }),
  // lifecycle({
  //   componentWillMount() {
  //     this.props.fetchSalary()
  //     this.props.setSubscription(!isEmpty(this.props.dataSubscription) && this.props.dataSubscription)
  //   }
  // }),
)(SalaryView)
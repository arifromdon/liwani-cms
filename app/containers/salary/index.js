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
import { historyRecapSalary, historyRecapSalaryEmployee } from 'actions/recap'
import withForms from 'utils/hocs/withForms'
import SalaryView from 'components/pages/salary'

export function mapStateToProps(state) {
  const {
    isFetching,
    errorMessage,
    dataSalary,
    pagination,
  } = state.root.salary

  const {
    isFetchingHistory,
    dataHistoryRecap,
  } = state.root.historyRecap

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
  historyRecapSalary: bindActionCreators(historyRecapSalary, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('modalEditSallary', 'setModalEditSallary', false),
  withState('modalEditCashReceipt', 'setModalEditCashReceipt', false),
  withState('getId', 'setGetId', ''),
  withState('getTypeUser', 'setTypeUser', ''),
  withState('searchValue', 'setSearchValue', {
    position: '',
    page: '1',
  }),
  withForms(),
  withHandlers({
    search: props => () => {
      const { searchValue } = props
      const page = `${searchValue.page ? `?page=${searchValue.page}&per=10` : ''}`
      const params = page ? `${page}${searchValue.status ? `&status_employee=${searchValue.status}` : ''}${searchValue.page && (searchValue.status || searchValue.position) && '&'}${searchValue.position ? `jabatan=${searchValue.position}` : ''}` : ''
      props.fetchSalary(`${params}`)
    },
  }),
  withHandlers({
    handlePageChange: props => (params) => {
      props.setSearchValue({ ...props.searchValue, page: params })
      setTimeout(() => {
        props.search()
      }, 300)
    },
    handleExport: props => (data) => {
      data.preventDefault()
      // props.exportSalary()
    },
    handleEditSalary: props => (data) => {
      data.preventDefault()
      props.editSalary({ id: props.getId, data: props.form })

      setTimeout(() => {
        props.setModalEditSallary(false)
        props.search()
      }, 300)
    },
    handleEditCashReceipt: props => (data) => {
      data.preventDefault()
      props.updateCashReceipt({ id: props.getId, data: props.form })

      setTimeout(() => {
        props.setModalEditCashReceipt(false)
        props.search()
      }, 300)
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
        props.setForm('')
      } else if (data.field === 'cash_receipt') {
        props.setModalEditCashReceipt(false)
        props.setForm('')
      }
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.fetchSalary('?page=1&per=10')
      this.props.setTypeUser(localStorage.getItem("user"))

      // let today = new Date();
      // let currentMonth = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // this.props.historyRecapSalary({ month: moment(currentMonth).format("MMMM YYYY") })
    }
  }),
)(SalaryView)
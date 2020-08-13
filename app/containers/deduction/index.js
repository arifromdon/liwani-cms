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
  fetchDeduction,
  createDeduction,
  updateStock,
  deleteStock
} from 'actions/deduction'
import { fetchEmployee } from 'actions/employee'
import withForms from 'utils/hocs/withForms'
import DeductionView from 'components/pages/deduction'

export function mapStateToProps(state) {
  const {
    isFetching,
    dataDeduction,
    errorMessage,
  } = state.root.deduction

  const {
    isFetchingCreate,
    errorMessageCreate,
  } = state.root.createDeduction

  const {
    dataEmployee,
    pagination,
  } = state.root.employee

  return {
    isFetchingCreate,
    errorMessageCreate,
    isFetching,
    dataDeduction,
    errorMessage,
    dataEmployee,
    pagination,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDeduction: bindActionCreators(fetchDeduction, dispatch),
  createDeduction: bindActionCreators(createDeduction, dispatch),
  updateStock: bindActionCreators(updateStock, dispatch),
  deleteStock: bindActionCreators(deleteStock, dispatch),
  fetchEmployee: bindActionCreators(fetchEmployee, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('modalCreate', 'setModalCreate', false),
  withState('modalAdd', 'setModalAdd', false),
  withState('modalEdit', 'setModalEdit', false),
  withState('modalDelete', 'setModalDelete', false),
  withState('getId', 'setGetId', ''),
  withState('getTypeUser', 'setTypeUser', ''),
  withState('getDateStockIn', 'setGetDateStockIn', ''),
  withState('getDateStockOut', 'setGetDateStockOut', ''),
  withState('getDataEmployee', 'setDataEmployee', []),
  withState('getEmployeeSelected', 'setEmployeeSelected', undefined),
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
      props.fetchDeduction(`${params}`)
    },
  }),
  withHandlers({
    handlePageChange: props => (params) => {
      props.setSearchValue({ ...props.searchValue, page: params })
      setTimeout(() => {
        props.search()
      }, 500)
    },
    handleSelect: props => (data) => {
      if (data.field === 'province') {
        props.setProvinceSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'district') {
        props.setDistrictSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'subDistrict') {
        props.setSubDistrictSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'employee_selected') {
        props.setEmployeeSelected(!isEmpty(data) ? data.value : undefined)
      }
    },
    handleDate: props => (data) => {
      if (data.title === 'date_in') {
        props.setGetDateStockIn(moment(data.date).format("DD MMMM YYYY"))
      } else if (data.title === 'date_out') {
        props.setGetDateStockOut(moment(data.date).format("DD MMMM YYYY"))
      }
    },
    handleCreateDeduction: props => (data) => {
      data.preventDefault()
      props.createDeduction({
        ...props.form,
        employee_id: props.getId,
      })

      setTimeout(() => {
        props.search()
        props.setForm('')
        props.setModalCreate(false)
        props.setModalAdd(false)
        message.error(props.errorMessageCreate)
      }, 500)
    },
    handleEditStock: props => (data) => {
      data.preventDefault()
      props.updateStock({
        data: {
          in_stock: !isEmpty(props.form.in_stock) ? parseInt(props.form.in_stock) : 0,
          out_stock: !isEmpty(props.form.out_stock) ? parseInt(props.form.out_stock) : 0,
          actor: props.getEmployeeSelected.label
        },
        id: props.getId
      })

      setTimeout(() => {
        props.search()
        props.setForm('')
        props.setModalEdit(false)
      }, 500)
    },
    handleDeleteStock: props => (data) => {
      data.preventDefault()
      props.deleteStock(props.getId)

      setTimeout(() => {
        props.search()
        props.setModalDelete(false)
      }, 500)
    },
    handleModal: props => (params) => {
      if (params.field === 'create') {
        props.setModalCreate(true)
      } else if (params.field === 'add') {
        props.setModalAdd(true)
        props.setGetId(params.data.id)
      } else if (params.field === 'edit') {
        props.setModalEdit(true)
        props.setForm(params.data)
        props.setGetId(params.data.id)
      } else if (params.field === 'delete') {
        props.setModalDelete(true)
        props.setGetId(params.id)
      }
    },
    handleModalClose: props => (data) => {
      if (data.field === 'create') {
        props.setModalCreate(false)
        props.setForm('')
      } else if (data.field === 'add') {
        props.setModalAdd(false)
        props.setForm('')
      } else if (data.field === 'edit') {
        props.setModalEdit(false)
        props.setForm('')
      } else if (data.field === 'delete') {
        props.setModalDelete(false)
      }
    },
  }),
  lifecycle({
    componentWillMount() {
      const {
        dataEmployee,
        fetchDeduction,
        fetchEmployee,
        setDataEmployee,
        dataDeduction,
        errorMessageCreate,
        setTypeUser,
      } = this.props

      setTypeUser(localStorage.getItem("user"))

      fetchDeduction('?page=1&per=10')
      fetchEmployee()

      const arr = []
      !isEmpty(dataEmployee) &&
      dataEmployee.map((item, index) => {
        return arr.push(item)
      })

      setDataEmployee(arr)
    }
  }),
)(DeductionView)
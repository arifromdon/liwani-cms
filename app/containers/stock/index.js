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
  fetchStock,
  createStock,
  updateStock,
  deleteStock
} from 'actions/stock'
import { fetchEmployee } from 'actions/employee'
import withForms from 'utils/hocs/withForms'
import StockView from 'components/pages/stock'

export function mapStateToProps(state) {
  const {
    isFetching,
    dataStock,
    pagination,
    errorMessage,
  } = state.root.stock

  const {
    dataEmployee,
  } = state.root.employee

  const { typeUser } = state.root.auth

  return {
    isFetching,
    dataStock,
    pagination,
    errorMessage,
    dataEmployee,
    typeUser,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStock: bindActionCreators(fetchStock, dispatch),
  createStock: bindActionCreators(createStock, dispatch),
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
  withState('modalEdit', 'setModalEdit', false),
  withState('modalDelete', 'setModalDelete', false),
  withState('getId', 'setGetId', ''),
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
      props.fetchStock(`${params}`)
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
    handleCreateStock: props => (data) => {
      data.preventDefault()
      props.createStock({
        ...props.form,
        price_stock: parseInt(props.form.price_stock),
        in_stock: parseInt(props.form.in_stock),
      })

      setTimeout(() => {
        props.search()
        props.setForm('')
        props.setModalCreate(false)
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
        fetchStock,
        fetchEmployee,
        setDataEmployee,
        pagination,
        dataStock,
      } = this.props
      fetchStock('?page=1&per=10')
      fetchEmployee()

      const arr = []
      !isEmpty(dataEmployee) &&
      dataEmployee.map((item, index) => {
        let data = { value: item.email, label: item.employee_name }
        return arr.push(data)
      })

      setDataEmployee(arr)
    }
  }),
)(StockView)
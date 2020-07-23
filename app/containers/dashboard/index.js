import { connect } from 'react-redux'
import { isEmpty, capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import {
  compose,
  withHandlers,
  lifecycle,
  withState
} from 'recompose'
import {
  fetchEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from 'actions/employee'
import { historyRecapSalary } from 'actions/recap'
import withForms from 'utils/hocs/withForms'
import DashboardView from 'components/pages/dashboard'

export function mapStateToProps(state) {
  const {
    isFetching,
    pagination,
    dataEmployee,
  } = state.root.employee

  const { typeUser } = state.root.auth

  const {
    isFetchingHistory,
    dataHistoryRecap,
  } = state.root.historyRecap

  const {
    isFetchingCreate,
    dataEmployeeCreate,
  } = state.root.createEmployee

  const {
    isFetchingUpdate,
  } = state.root.updateEmployee

  return {
    dataEmployee,
    isFetchingCreate,
    isFetchingUpdate,
    isFetching,
    pagination,
    dataEmployeeCreate,
    typeUser,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEmployee: bindActionCreators(fetchEmployee, dispatch),
  createEmployee: bindActionCreators(createEmployee, dispatch),
  updateEmployee: bindActionCreators(updateEmployee, dispatch),
  deleteEmployee: bindActionCreators(deleteEmployee, dispatch),
  historyRecapSalary: bindActionCreators(historyRecapSalary, dispatch),
})

// const formData = new FormData()

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('modalCreate', 'setModalCreate', false),
  withState('modalEdit', 'setModalEdit', false),
  withState('modalDelete', 'setModalDelete', false),
  withState('getId', 'setGetId', {}),
  withState('getDate', 'setGetDate', ''),
  withState('positionSelected', 'setPositionSelected', undefined),
  withState('statusSelected', 'setStatusSelected', undefined),
  withState('filterStatusSelected', 'setFilterStatusSelected', undefined),
  withState('filterPositionSelected', 'setFilterPositionSelected', undefined),
  withState('listEmployee', 'setListEmployee', []),
  withState('getPosition', 'setPosition', [
    {value: 'admin', label: 'Admin'},
    {value: 'petani', label: 'Petani'},
    {value: 'karyawan', label: 'Karyawan'},
    {value: 'kepala_kebun', label: 'Kepala Kebun'},
  ]),
  withState('getStatus', 'setStatus', [
    {value: 'tetap', label: 'Tetap'},
    {value: 'kontrak', label: 'Kontrak'},
    {value: 'harian', label: 'Harian'},
  ]),
  withState('searchValue', 'setSearchValue', {
    position: '',
    status: '',
    page: '1',
  }),
  withForms(),
  withHandlers({
    search: props => () => {
      const { searchValue } = props
      const page = `${searchValue.page ? `?page=${searchValue.page}&per=10` : ''}`
      const params = page ? `${page}${searchValue.status ? `&status_employee=${searchValue.status}` : ''}${searchValue.page && (searchValue.status || searchValue.position) && '&'}${searchValue.position ? `jabatan=${searchValue.position}` : ''}` : ''
      props.fetchEmployee(`${params}`)
    },
  }),
  withHandlers({
    handlePageChange: props => (params) => {
      props.setSearchValue({ ...props.searchValue, page: params })
      setTimeout(() => {
        props.search()
      }, 500)
    },
    handleSelectFilter: props => (data) => {
      if (data.field === 'filter-position') {
        props.setFilterPositionSelected(!isEmpty(data) ? data.value : undefined)
        props.setSearchValue({ ...props.searchValue, position: data.value ? data.value.value : undefined })
      } else if (data.field === 'filter-status') {
        props.setFilterStatusSelected(!isEmpty(data) ? data.value : undefined)
        props.setSearchValue({ ...props.searchValue, status: data.value ? data.value.value : undefined })
      }

      setTimeout(() => {
        props.search()
      }, 500)
    },
    onChangeDate: props => (data) => {
      props.setGetDate(moment(data).format('DD-MM-YYYY'))
    },
    handleDeleteEmployee: props => (data) => {
      data.preventDefault()
      props.deleteEmployee(props.getId)

      setTimeout(() => {
        props.setModalDelete(false)
        props.search()
      }, 500);
    },
    handleCreateEmployee: props => (data) => {
      data.preventDefault()
      const dataCreate = {
        ...props.form,
        salary_per_day: parseInt(props.form.salary_per_day),
        position: props.positionSelected.value,
        status: props.statusSelected.value,
        total_deduction: 0,
        monthly_deduction: 0,
        remaining_deduction: 0,
        total_salary: 0,
        join: props.getDate
      }
      props.createEmployee(dataCreate)

      setTimeout(() => {
        props.setModalCreate(props.isFetchingCreate)
        props.setForm('')
        props.search()
      }, 500);
    },
    handleEditEmployee: props => (data) => {
      data.preventDefault()
      const dataEdit = {
        ...props.form,
        position: props.positionSelected.value,
        status: props.statusSelected.value,
        join: props.getDate
      }

      props.updateEmployee({ data: dataEdit, id: props.getId })

      setTimeout(() => {
        props.setModalEdit(props.isFetchingUpdate)
        props.setForm('')
        props.search()
      }, 500);
    },
    handleSelect: props => (data) => {
      if (data.field === 'position') {
        props.setPositionSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'status') {
        props.setStatusSelected(!isEmpty(data) ? data.value : undefined)
      } 
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
      this.props.fetchEmployee('?page=1&per=10')
      let today = new Date();
      let currentMonth = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.props.historyRecapSalary({ month: moment(currentMonth).format("MMMM YYYY") })
    },
  }),
)(DashboardView)
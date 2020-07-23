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
  fetchAbsent,
  createAbsent,
  updateAbsent,
} from 'actions/absent'
import { fetchEmployee } from 'actions/employee'
import withForms from 'utils/hocs/withForms'
import AbsentView from 'components/pages/absent'

export function mapStateToProps(state) {
  const {
    isFetching,
    errorMessage,
    dataAbsent,
    pagination,
  } = state.root.absent

  const { typeUser } = state.root.auth

  const {
    dataEmployee,
  } = state.root.employee

  const {
    messageCreate,
    dataCreateAbsent,
  } = state.root.createAbsent

  return {
    isFetching,
    errorMessage,
    dataAbsent,
    pagination,
    dataEmployee,
    messageCreate,
    dataCreateAbsent,
    typeUser,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchAbsent: bindActionCreators(fetchAbsent, dispatch),
  createAbsent: bindActionCreators(createAbsent, dispatch),
  updateAbsent: bindActionCreators(updateAbsent, dispatch),
  fetchEmployee: bindActionCreators(fetchEmployee, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withForms(),
  withState('modalEdit', 'setModalEdit', false),
  withState('modalCreate', 'setModalCreate', false),
  withState('getId', 'setGetId', ''),
  withState('statusAbsenstSelected', 'setStatusAbsenstSelected', undefined),
  withState('getDataEmployee', 'setDataEmployee', []),
  withState('getEmployeeSelected', 'setEmployeeSelected', undefined),
  withState('statusAbsent', 'setStatusAbsent', [
    {value: 'masuk', label: 'Masuk', isDisabled: false},
    {value: 'alpa', label: 'Alpa', isDisabled: false},
    {value: 'izin', label: 'Izin', isDisabled: false},
    {value: 'cuti', label: 'Cuti', isDisabled: false},
    {value: 'keluar', label: 'Keluar', isDisabled: false},
  ]),
  withState('searchValue', 'setSearchValue', {
    status: '',
    page: '1',
  }),
  withHandlers({
    search: props => () => {
      const { searchValue } = props
      const page = `${searchValue.page ? `?page=${searchValue.page}` : ''}`
      const params = page ? `${page}${searchValue.status ? `&status_employee=${searchValue.status}` : ''}${searchValue.page && (searchValue.status || searchValue.position) && '&'}${searchValue.position ? `jabatan=${searchValue.position}` : ''}` : ''
      props.fetchAbsent(`${params}`)
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
      props.setStatusAbsenstSelected(data)
      props.setEmployeeSelected(data.value)
    },
    handleCreateAbsent: props => (event) => {
      event.preventDefault()
      var today = new Date().getHours();

      if (today < 8 || today > 17 || today === 17) {
        message.error("Jam kerja telah berlalu");
        props.setModalCreate(false)
      } else {
        props.createAbsent({ "phone_number": props.getEmployeeSelected.value })

        setTimeout(() => {
          props.search()
          props.setModalCreate(false)
        }, 500)
      }
    },
    handleEditAbsent: props => (data) => {
      data.preventDefault()
      var today = new Date().getHours()

      if (today < 8 || today > 17) {
        message.error("Jam kerja telah berlalu");
        props.setModalEdit(false)
      } else {
        props.updateAbsent({ id: props.getId , data: { status_absent: props.statusAbsenstSelected.value }})
        setTimeout(() => {
          props.search()
          props.setModalEdit(false)
        }, 500) 
      }
    },
    handleModal: props => (data) => {
      if (data.field === 'edit') {
        props.setModalEdit(true)
        props.setGetId(data.id)

        props.statusAbsent.filter((item) => {
          if (props.dataAbsent.filter(item => item.status_absent === 'masuk')) {
            props.statusAbsent.map((data) => {
              if (data.value.includes('alpa')) {
                // props.setStatusAbsent(...props.statusAbsent, isDisabled: true)
                console.log('hallo')
              }
            })
            // props.statusAbsent.filter(data => data.value === 'alpa' || data.value === 'cuti' ? data.isDisabled = true : data.isDisabled = false)
          }
          if (props.dataAbsent.filter(item => item.status_absent === 'izin')) {
            props.statusAbsent.filter(data => data.value === 'alpa' || data.value === 'cuti' ? data.isDisabled = true : data.isDisabled = false)
          }
          if (props.dataAbsent.filter(item => item.status_absent === 'keluar')) {
            props.statusAbsent.filter(data => data.value === 'alpa' || data.value === 'cuti' || data.value === 'masuk' || data.value === 'izin' ? data.isDisabled = true : data.isDisabled = false)
          }
          if (props.dataAbsent.filter(item => item.status_absent === 'alpa')) {
            props.statusAbsent.filter(data => data.value === 'masuk' || data.value === 'cuti' || data.value === 'keluar' || data.value === 'izin' ? data.isDisabled = true : data.isDisabled = false)
          }
          if (props.dataAbsent.filter(item => item.status_absent === 'belum_absen')) {
            props.statusAbsent.filter(data => data.isDisabled = false)
          }
        })
      } else if (data.field === 'create') {
        props.setModalCreate(true)
      }
    },
    handleModalClose: props => (data) => {
      if (data.field === 'edit') {
        props.setModalEdit(false)
        props.setForm()
      } if (data.field === 'create') {
        props.setModalCreate(false)
        props.setForm()
      }
    },
  }),
  lifecycle({
    componentWillMount() {
      const {
        dataEmployee,
        fetchAbsent,
        fetchEmployee,
        setDataEmployee,
        statusAbsent,
        dataAbsent,
      } = this.props
      fetchAbsent('?page=1')
      fetchEmployee()

      const arr = []
      !isEmpty(dataEmployee) &&
      dataEmployee.map((item, index) => {
        let data = { value: item.phone_number, label: item.employee_name }
        return arr.push(data)
      })

      setDataEmployee(arr)
    },
    componentDidUpdate() {

    }
  }),
)(AbsentView)
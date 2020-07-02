import { connect } from 'react-redux'
import { isEmpty, capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import {
  compose,
  withHandlers,
  lifecycle,
  withState
} from 'recompose'
import withForms from 'utils/hocs/withForms'
import DashboardView from 'components/pages/dashboard'

// export function mapStateToProps(state) {
//   const {
//     dataProvince,
//   } = state.root.province

//   return {
//     dataProvince,
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   getProvinceRequest: bindActionCreators(fetchProvinceRequest, dispatch),
//   getDistrictRequest: bindActionCreators(fetchDistrictRequest, dispatch),
//   getSubDistrictRequest: bindActionCreators(fetchSubDistrictRequest, dispatch),
//   getPriceByLocationRequest: bindActionCreators(fetchPriceByLocationRequest, dispatch),
//   importPriceByLocationRequest: bindActionCreators(dispatchImportPriceRequest, dispatch),
//   exportPriceByLocationRequest: bindActionCreators(fetchingExportPriceRequest, dispatch),
//   editPriceByLocationRequest: bindActionCreators(dispatchEditPriceRequest, dispatch),
// })

// const formData = new FormData()

export default compose(
  // connect(
  //   mapStateToProps,
  //   mapDispatchToProps,
  // ),
  withState('modalCreate', 'setModalCreate', false),
  withState('modalEdit', 'setModalEdit', false),
  withState('modalDelete', 'setModalDelete', false),
  withState('getId', 'setGetId', ''),
  withForms(),
  withHandlers({
    handleDeleteEmployee: props => (data) => {
      data.preventDefault()
      console.log('getId ;', props.getId)
    },
    handleCreateEmployee: props => (data) => {
      data.preventDefault()
    },
    handleEditEmployee: props => (data) => {
      data.preventDefault()
      console.log('getId ;', props.getId)
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
    handleModal: props => (data) => {
      if (data.field === 'create') {
        props.setModalCreate(true)
      } else if (data.field === 'edit') {
        props.setModalEdit(true)
        props.setGetId(data.id)
      } else if (data.field === 'delete') {
        props.setModalDelete(true)
        props.setGetId(data.id)
      }
    },
    handleModalClose: props => (data) => {
      if (data.field === 'create') {
        props.setModalCreate(false)
      } else if (data.field === 'edit') {
        props.setModalEdit(false)
      } else if (data.field === 'delete') {
        props.setModalDelete(false)
      }
    },
  }),
  // lifecycle({
  //   componentWillMount() {
  //     this.props.getProvinceRequest()
  //     this.props.getDistrictRequest()
  //     this.props.getSubDistrictRequest()
  //     const arrProvince = []
  //     const arrDistrict = []
  //     const arrSubDistrict = []
      
  //     !isEmpty(this.props.dataProvince) && 
  //     this.props.dataProvince.map((item, index) => {  
  //       let valueProvince = { value: item.provincy_id, label: capitalize(item.name) }
  //       return arrProvince.push(valueProvince)
  //     })

  //     !isEmpty(this.props.dataDistrict) && 
  //     this.props.dataDistrict.map((item, index) => {
  //       let valueDistrict = { value: item.city_id, label: capitalize(item.city_name) }
  //       return arrDistrict.push(valueDistrict)
  //     })

  //     !isEmpty(this.props.dataSubDistrict) && 
  //     this.props.dataSubDistrict.map((item, index) => {
  //       let valueSubDistrict = { value: item.sub_city_id, label: capitalize(item.sub_city_name) }
  //       return arrSubDistrict.push(valueSubDistrict)
  //     })

  //     this.props.setProvinceOptions(arrProvince)
  //     this.props.setDistrictOptions(arrDistrict)
  //     this.props.setSubDistrictOptions(arrSubDistrict)
  //   },
  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     if (prevProps.dataPriceLocation !== this.props.dataPriceLocation) {
  //       this.props.setListData(this.props.dataPriceLocation)
  //     } else if (prevProps.dataImportPrice !== this.props.dataImportPrice) {
  //       this.props.setListData(this.props.dataImportPrice)
  //     }
  //   }
  // }),
)(DashboardView)
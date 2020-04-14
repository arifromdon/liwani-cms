import { connect } from 'react-redux'
import { isEmpty, capitalize } from 'lodash'
import { bindActionCreators } from 'redux'
import {
  compose,
  withHandlers,
  lifecycle,
  withState
} from 'recompose'
import { message } from 'antd'
import {
  fetchProvinceRequest,
  fetchDistrictRequest,
  fetchSubDistrictRequest
} from 'actions/Location'
import withForms from 'utils/hocs/withForms'
import {
  fetchPriceByLocationRequest,
  dispatchImportPriceRequest,
  fetchingExportPriceRequest,
  dispatchEditPriceRequest
} from 'actions/Price'
import LocationView from 'components/pages/location'

export function mapStateToProps(state) {
  const {
    dataProvince,
  } = state.root.province

  const {
    dataDistrict
  } = state.root.district

  const {
    dataSubDistrict
  } = state.root.subDistrict

  const {  
    dataExportPrice,
    loadingExport
  } = state.root.exportPrice

  const {  
    loadingImport,
    dataImportPrice
  } = state.root.importPrice

  const {
    errorMessage,
    loadingPrice,
    dataPriceLocation,
  } = state.root.priceByLocation

  return {
    errorMessage,
    loadingPrice,
    dataPriceLocation,
    dataProvince,
    dataDistrict,
    dataSubDistrict,
    dataExportPrice,
    loadingExport,
    loadingImport,
    dataImportPrice,
  }
}

const mapDispatchToProps = dispatch => ({
  getProvinceRequest: bindActionCreators(fetchProvinceRequest, dispatch),
  getDistrictRequest: bindActionCreators(fetchDistrictRequest, dispatch),
  getSubDistrictRequest: bindActionCreators(fetchSubDistrictRequest, dispatch),
  getPriceByLocationRequest: bindActionCreators(fetchPriceByLocationRequest, dispatch),
  importPriceByLocationRequest: bindActionCreators(dispatchImportPriceRequest, dispatch),
  exportPriceByLocationRequest: bindActionCreators(fetchingExportPriceRequest, dispatch),
  editPriceByLocationRequest: bindActionCreators(dispatchEditPriceRequest, dispatch),
})

const formData = new FormData()

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('provinceSelected', 'setProvinceSelected', undefined),
  withState('provinceOptions', 'setProvinceOptions', []),
  withState('districtSelected', 'setDistrictSelected', undefined),
  withState('districtOptions', 'setDistrictOptions', []),
  withState('subDistrictSelected', 'setSubDistrictSelected', undefined),
  withState('subDistrictOptions', 'setSubDistrictOptions', []),
  withState('listData', 'setListData', []),
  withState('modalShow', 'setModalShow', false),
  withState('idProduct', 'setIdProduct', ''),
  withForms(),
  withHandlers({
    handleSelect: props => (data) => {
      if (data.field === 'province') {
        props.setProvinceSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'district') {
        props.setDistrictSelected(!isEmpty(data) ? data.value : undefined)
      } else if (data.field === 'subDistrict') {
        props.setSubDistrictSelected(!isEmpty(data) ? data.value : undefined)
      }
    },
    handleGetPrice: props => (data) => {
      props.getPriceByLocationRequest({
        sub_city_id: !isEmpty(data) ? data.value : undefined
      })
    },
    handleImport: props => (file) => {
      formData.append("file", file.currentTarget.files[0]);
      formData.append("sheet_name", "Sheet1");
      props.importPriceByLocationRequest(formData)
    },
    handleExport: props => () => {
      props.exportPriceByLocationRequest()
      props.setListData(props.dataExportPrice)
    },
    handleModalEdit: props => (data) => {
      props.setIdProduct(data)
      props.setModalShow(true)
    },
    handleEdit: props => (event) => {
      event.preventDefault()
      console.log('props.form: ', props.form)
      const formEdit = {
        price1: parseInt(props.form.price1),
        price2: parseInt(props.form.price2),
        price3: parseInt(props.form.price3),
        price4: parseInt(props.form.price4),
        price5: parseInt(props.form.price5),
        age1: parseInt(props.form.age1),
        age2: parseInt(props.form.age2),
        age3: parseInt(props.form.age3),
        age4: parseInt(props.form.age4),
        age5: parseInt(props.form.age5),
        egg_price: parseInt(props.form.egg_price),
      }

      props.editPriceByLocationRequest({ id: props.idProduct, form: formEdit })
      props.setModalShow(false)
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.getProvinceRequest()
      this.props.getDistrictRequest()
      this.props.getSubDistrictRequest()
      const arrProvince = []
      const arrDistrict = []
      const arrSubDistrict = []
      
      !isEmpty(this.props.dataProvince) && 
      this.props.dataProvince.map((item, index) => {  
        let valueProvince = { value: item.provincy_id, label: capitalize(item.name) }
        return arrProvince.push(valueProvince)
      })

      !isEmpty(this.props.dataDistrict) && 
      this.props.dataDistrict.map((item, index) => {
        let valueDistrict = { value: item.city_id, label: capitalize(item.city_name) }
        return arrDistrict.push(valueDistrict)
      })

      !isEmpty(this.props.dataSubDistrict) && 
      this.props.dataSubDistrict.map((item, index) => {
        let valueSubDistrict = { value: item.sub_city_id, label: capitalize(item.sub_city_name) }
        return arrSubDistrict.push(valueSubDistrict)
      })

      this.props.setProvinceOptions(arrProvince)
      this.props.setDistrictOptions(arrDistrict)
      this.props.setSubDistrictOptions(arrSubDistrict)
    },
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.dataPriceLocation !== this.props.dataPriceLocation) {
        this.props.setListData(this.props.dataPriceLocation)
      } else if (prevProps.dataImportPrice !== this.props.dataImportPrice) {
        this.props.setListData(this.props.dataImportPrice)
      }
    }
  }),
)(LocationView)
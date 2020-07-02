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
import withForms from 'utils/hocs/withForms'
import StockView from 'components/pages/stock'

export function mapStateToProps(state) {
  const {
    isFetching,
    dataStock,
    pagination,
    errorMessage,
  } = state.root.stock

  return {
    isFetching,
    dataStock,
    pagination,
    errorMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStock: bindActionCreators(fetchStock, dispatch),
  createStock: bindActionCreators(createStock, dispatch),
  updateStock: bindActionCreators(updateStock, dispatch),
  deleteStock: bindActionCreators(deleteStock, dispatch),
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
    handleCreateStock: props => (data) => {
      data.preventDefault()
    },
    handleEditStock: props => (data) => {
      data.preventDefault()
      console.log('getId ;', props.getId)
    },
    handleDeleteStock: props => (data) => {
      data.preventDefault()
      console.log('getId ;', props.getId)
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
  //     this.props.fetchStock()
  //     this.props.setSubscription(!isEmpty(this.props.dataSubscription) && this.props.dataSubscription)
  //   }
  // }),
)(StockView)
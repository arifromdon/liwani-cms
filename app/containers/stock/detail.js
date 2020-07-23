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
import { fetchDetailStock } from 'actions/stock'
import DetailStockView from 'components/pages/stock/detail'

export function mapStateToProps(state) {
  const {
    isFetchingDetail,
    dataDetailStock,
    errorMessage,
  } = state.root.detailStock

  const { typeUser } = state.root.auth

  return {
    isFetchingDetail,
    dataDetailStock,
    errorMessage,
    typeUser,  
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDetailStock: bindActionCreators(fetchDetailStock, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // withState('modalCreate', 'setModalCreate', false),
  // withState('getId', 'setGetId', ''),
  // withHandlers({
  //   handleSelect: props => (data) => {
  //     if (data.field === 'province') {
  //       props.setProvinceSelected(!isEmpty(data) ? data.value : undefined)
  //     } else if (data.field === 'district') {
  //       props.setDistrictSelected(!isEmpty(data) ? data.value : undefined)
  //     } else if (data.field === 'subDistrict') {
  //       props.setSubDistrictSelected(!isEmpty(data) ? data.value : undefined)
  //     }
  //   },
  // }),
  lifecycle({
    componentWillMount() {
      let pathTarget = this.props.location.pathname
      let getIdPathname = pathTarget.substring(pathTarget.lastIndexOf('/') + 1)

      this.props.fetchDetailStock(getIdPathname)
    }
  }),
)(DetailStockView)
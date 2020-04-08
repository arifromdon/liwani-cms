import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import { compose, withHandlers } from 'recompose'
import {
  dispatchImportPriceRequest,
  fetchingExportPriceRequest,
  dispatchEditPriceRequest
} from 'actions/Price'
import PriceView from 'components/pages/price'

export function mapStateToProps(state) {
  const {
    loadingEdit,
    dataEditPrice,
  } = state.editPrice

  const {
    loadingExport,
    dataExportPrice,
  } = state.exportPrice

  const {
    loadingImport,
    dataImportPrice,
  } = state.importPrice

  return {
    loadingEdit,
    dataEditPrice,
    loadingExport,
    dataExportPrice,
    loadingImport,
    dataImportPrice
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchImportPriceRequest: bindActionCreators(dispatchImportPriceRequest, dispatch),
  fetchingExportPriceRequest: bindActionCreators(fetchingExportPriceRequest, dispatch),
  dispatchEditPriceRequest: bindActionCreators(dispatchEditPriceRequest, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PriceView)

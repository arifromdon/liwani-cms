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
  fetchRecap,
  exportRecap,
  detailRecap,
} from 'actions/recap'
import RecapView from 'components/pages/recap'

export function mapStateToProps(state) {
  const {
    isFetching,
    errorMessage,
    dataRecap,
    pagination,
  } = state.root.recap

  const { typeUser } = state.root.auth

  return {
    isFetching,
    errorMessage,
    dataRecap,
    pagination,
    typeUser,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchRecap: bindActionCreators(fetchRecap, dispatch),
  exportRecap: bindActionCreators(exportRecap, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('exportBulk', 'setExportBulk', []),
  withState('exportSalary', 'setExportSalary', []),
  withState('exportStock', 'setExportStock', []),
  withState('modalExportBulk', 'setModalExportBulk', false),
  withState('modalExportStock', 'setModalExportStock', false),
  withState('modalExportSalary', 'setModalExportSalary', false),
  withState('getTarget', 'setGetTarget', ''),
  withHandlers({
    handleDetailRecap: props => (data) => {
      props.detailRecap(data)
    },
    handleExport: props => (params) => {
      const exportDate = moment(params).format("MMMM YYYY").toUpperCase()
      const targetExport = props.getTarget

      if (targetExport === 'salary') {
        props.exportRecap({ target: targetExport, data: exportDate })
      } else if (targetExport === 'stock') {
        props.exportRecap({ target: targetExport, data: exportDate })
      } else if (targetExport === 'bulk') {
        props.exportRecap({ target: targetExport, data: exportDate })
      }
    },
    handleModalExport: props => (data) => {
      if (data.field === 'bulk') {
        props.setModalExportBulk(true)
        props.setGetTarget('bulk')
      } else if (data.field === 'stock') {
        props.setModalExportStock(true)
        props.setGetTarget('stock')
      } else if (data.field === 'salary') {
        props.setModalExportSalary(true)
        props.setGetTarget('salary')
      }
    },
    handleModalClose: props => (data) => {
      if (data.field === 'bulk') {
        props.setModalExportBulk(false)
      } else if (data.field === 'stock') {
        props.setModalExportStock(false)
      } else if (data.field === 'salary') {
        props.setModalExportSalary(false)
      }
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.fetchRecap()
    }
  }),
)(RecapView)
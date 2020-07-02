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
import withForms from 'utils/hocs/withForms'
import AbsentView from 'components/pages/absent'

export function mapStateToProps(state) {
  const {
    isFetching,
    errorMessage,
    dataAbsent,
    pagination,
  } = state.root.absent

  return {
    isFetching,
    errorMessage,
    dataAbsent,
    pagination,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchAbsent: bindActionCreators(fetchAbsent, dispatch),
  createAbsent: bindActionCreators(createAbsent, dispatch),
  updateAbsent: bindActionCreators(updateAbsent, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withForms(),
  withState('modalEdit', 'setModalEdit', false),
  withState('getId', 'setGetId', ''),
  withHandlers({
    handleEditAbsent: props => (data) => {
      data.preventDefault()
      console.log('getId ;', props.getId)
    },
    handleModal: props => (data) => {
      if (data.field === 'edit') {
        props.setModalEdit(true)
        props.setGetId(data.id)
      }
    },
    handleModalClose: props => (data) => {
      if (data.field === 'edit') {
        props.setModalEdit(false)
      }
    },
  }),
  // lifecycle({
  //   componentWillMount() {
  //     this.props.fetchAbsent({ "period": moment().format("YYYY-MM") })
  //   }
  // }),
)(AbsentView)
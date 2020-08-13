import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'

const ModalItemAntd = ({
  show,
  modalBody,
  modalHeader,
  modalClose,
  cancelButtonProps,
  okButtonProps,
  onCancel,
  width
}) => (
  <div>
    <Modal
      title={modalHeader}
      visible={show}
      centered
      onCancel={onCancel}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      width={width}
    >
      {modalBody}
    </Modal>
  </div>
)

ModalItemAntd.propTypes = {
  show: PropTypes.bool,
  modalBody: PropTypes.any,
  cancelButtonProps: PropTypes.any,
  okButtonProps: PropTypes.any,
  modalHeader: PropTypes.string,
  width: PropTypes.string,
  modalClose: PropTypes.func,
  onCancel: PropTypes.func,
}

export default ModalItemAntd
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const ModalItem = ({
  show,
  modalBody,
  modalHeader,
  modalClose
}) => (
  <Modal
    show={show}
    onHide={modalClose}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {modalHeader}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {modalBody}
    </Modal.Body>
  </Modal>
)

ModalItem.propTypes = {
  show: PropTypes.bool,
  modalBody: PropTypes.any,
  modalHeader: PropTypes.string,
  modalClose: PropTypes.func,
}

export default ModalItem
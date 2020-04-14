import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const ModalItem = ({
  show,
  modalBody,
  modalHeader
}) => (
  <Modal
    show={show}
    size="lg"
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
}

export default ModalItem
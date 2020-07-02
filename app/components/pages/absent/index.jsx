import React from 'react'
import PropTypes from 'prop-types'
import {
  Dashboard,
  BasicTable,
  Card,
  HeaderPage,
  LoadingSkeleton,
  Button,
  Pagination,
  ModalItem,
  DatePickerComponent,
  SelectComponent,
  Input
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Icon } from 'antd'
import { Spinner, Container, Row, Col, Form } from 'react-bootstrap'
import moment from 'moment'

const columns = ['No', 'Nama Karyawan', 'Jam Masuk' , 'Jam Keluar', 'Position', 'Tanggal', 'Status', 'Action']

const AbsentPage = ({
  onChange,
  loading,
  handleModal,
  handleModalClose,
  handleEditAbsent,
  modalEdit,
  form,
}) => {

  const modalBodyEdit = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <DatePickerComponent
              label="Pilih Jam Masuk"
              placeholder='Masukan Jam Masuk'
              onChange={onChange}
            />
          </Col>
          <Col md={12}>
            <DatePickerComponent
              label="Pilih Jam Keluar"
              placeholder='Masukan Jam Keluar'
              onChange={onChange}
            />
          </Col>
          <Col md={12}>
            <DatePickerComponent
              label="Pilih Tanggal Masuk"
              placeholder='Masukan Tanggal Masuk'
              onChange={onChange}
            />
          </Col>
          <Col md={12}>
            <SelectComponent
              label='Pilih Status Absensi'
              name='status'
            />
          </Col>
        </Row>
      </Container>

      <Button
        type="submit"
        onClick={(e) => handleEditAbsent(e)}
      >Submit
      </Button>
    </Form>
  )

  return (
    <Dashboard topik="absent">
      <HeaderPage active="Absensi Karyawan" />

      <Card>
        <Container fluid className="mb-4">
          <Row>
            <Col md={{ span: 2, offset: 10 }}>
              <button
                type="button"
                className="btn btn-apply d-flex justify-content-center align-items-center"
                onClick={() => handleModal({field: 'create'})}
              >
                <Icon type="plus" />
                <small className="ml-2">Tambah Absensi</small>
              </button>
            </Col>
          </Row>
        </Container>

        <BasicTable columns={columns}>
          <tr key={Math.random()}>
            <td>1</td>
            <td>Jajang Gombres</td>
            <td>08.00</td>
            <td>05.00</td>
            <td>Staff</td>
            <td>18-07-2020</td>
            <td>
              <span className="badge badge-primary">
                Masuk
              </span>
            </td>
            <td className="d-flex justify-content-center">
              <button
                type="button"
                className="btn icon-button"
                onClick={() => handleModal({ field: 'edit', id: '2' })}
              >
                <Icon type="edit" />
              </button>
            </td>
          </tr>
        </BasicTable>

        <Container fluid className="mb-4">
          <Row>
            <Col md={{ span: 2, offset: 10 }}>
              <button
                type="button"
                className="btn btn-apply d-flex justify-content-center"
                onClick={() => handleModal({field: 'create'})}
              >
                <Icon type="save" />
                <small className="ml-2">Submit Absensi</small>
              </button>
            </Col>
          </Row>
        </Container>

        <div className="d-flex justify-content-end mt-4">
          <Pagination
            prevPageText={<Icon type="left"/>}
            nextPageText={<Icon type="right"/>}
            firstPageText={<Icon type="double-left"/>}
            lastPageText={<Icon type="double-right"/>}
            pageRangeDisplayed={5}
            totalItemsCount={20}
            activePage={1}
            linkClassFirst="symbol-arrow"
            linkClassPrev="symbol-arrow"
            linkClassNext="symbol-arrow"
            linkClassLast="symbol-arrow"
          />
        </div>

      </Card>

      {/*<ModalItem
        show={modalCreate}
        modalBody={modalBodyCreate}
        modalHeader='Tambah Stok Pakan'
        modalClose={() => handleModalClose({ field: 'create' })}
      />*/}

      <ModalItem
        show={modalEdit}
        modalBody={modalBodyEdit}
        modalHeader='Edit Absensi'
        modalClose={() => handleModalClose({ field: 'edit' })}
      />

    </Dashboard>
  )
}

AbsentPage.propTypes = {
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  modalEdit: PropTypes.bool,
  handleModal: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleEditAbsent: PropTypes.func,
}

export default AbsentPage

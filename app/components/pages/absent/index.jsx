import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {
  Dashboard,
  BasicTable,
  Card,
  HeaderPage,
  LoadingSkeleton,
  Button,
  Pagination,
  ModalItemAntd,
  DatePickerComponent,
  SelectComponent,
  Input
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Icon, Empty } from 'antd'
import { Spinner, Container, Row, Col, Form } from 'react-bootstrap'
import moment from 'moment'

const columns = ['No', 'Nama Karyawan', 'Jam Masuk' , 'Jam Keluar', 'Position', 'Tanggal', 'Status', 'Action']

const AbsentPage = ({
  onChange,
  isFetching,
  handleModal,
  modalCreate,
  handleModalClose,
  handleEditAbsent,
  handleCreateAbsent,
  modalEdit,
  form,
  statusAbsenstSelected,
  statusAbsent,
  handleSelect,
  dataAbsent,
  handlePageChange,
  pagination,
  getDataEmployee,
  getEmployeeSelected,
  typeUser,
}) => {
  const modalBodyEdit = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12} className="mb-3">
            <label htmlFor='employee_selected'>Pilih Status Absensi</label>
            <Select
              label='Pilih Status Absensi'
              name='status'
              value={statusAbsenstSelected}
              options={statusAbsent}
              onChange={e => handleSelect(e)}
            />
          </Col>
          <Col md={6} className="mb-3 mx-auto">
            <Button
              type="submit"
              onClick={(e) => handleEditAbsent(e)}
            >Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )

  const modalBodyCreate = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <label htmlFor='employee_selected'>Pilih Karyawan</label>
            <Select
              name='employee_selected'
              value={getEmployeeSelected}
              options={getDataEmployee}
              onChange={e => handleSelect({ value: e, field: 'employee_selected' })}
            />
          </Col>
          <Col md={6} className="mx-auto mt-4">
            <Button
              type="submit"
              onClick={(e) => handleCreateAbsent(e)}
            >Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )

  return (
    <Dashboard topik="absent" typeUser={typeUser}>
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

        {
          isFetching ?
          <div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          :
          <BasicTable columns={columns}>
            {
              !isEmpty(dataAbsent) ?
              dataAbsent.map((item, index) => {
                return(
                  <tr key={Math.random()}>
                    <td>{index + 1}</td>
                    <td>{item.employee_name}</td>
                    <td>{!isEmpty(item.entry_hour) ? moment(item.entry_hour).format("HH:MM") : '00:00'}</td>
                    <td>{!isEmpty(item.out_hour) ? moment(item.out_hour).format("HH:MM") : '00:00'}</td>
                    <td>{item.position}</td>
                    <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                    <td>
                      <span className="badge badge-primary">
                        {item.status_absent}
                      </span>
                    </td>
                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn icon-button"
                        onClick={() => handleModal({ field: 'edit', id: item.id })}
                      >
                        <Icon type="edit" />
                      </button>
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan="8" className="text-center py-5"><Empty /></td>
                </tr>
              )
            }
          </BasicTable>
        }

        <div className="d-flex justify-content-end mt-4">
          <Pagination
            prevPageText={<Icon type="left"/>}
            nextPageText={<Icon type="right"/>}
            firstPageText={<Icon type="double-left"/>}
            lastPageText={<Icon type="double-right"/>}
            pageRangeDisplayed={5}
            itemsCountPerPage={10}
            onChange={handlePageChange}
            totalItemsCount={isEmpty(pagination) ? 0 : (pagination.total_pages * 10)}
            activePage={isEmpty(pagination) ? 0 : pagination.current_page}
            linkClassFirst="symbol-arrow"
            linkClassPrev="symbol-arrow"
            linkClassNext="symbol-arrow"
            linkClassLast="symbol-arrow"
          />
        </div>

      </Card>

      <ModalItemAntd
        show={modalCreate}
        modalBody={modalBodyCreate}
        modalHeader='Tambah Absensi Karyawan'
        onCancel={() => handleModalClose({ field: 'create' })}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      />

      <ModalItemAntd
        show={modalEdit}
        modalBody={modalBodyEdit}
        modalHeader='Edit Absensi'
        onCancel={() => handleModalClose({ field: 'edit' })}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      />

    </Dashboard>
  )
}

AbsentPage.propTypes = {
  onChange: PropTypes.func,
  isFetching: PropTypes.bool,
  modalEdit: PropTypes.bool,
  modalCreate: PropTypes.bool,
  handleModal: PropTypes.func,
  handleCreateAbsent: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleEditAbsent: PropTypes.func,
  handleSelect: PropTypes.func,
  handlePageChange: PropTypes.func,
  statusAbsenstSelected: PropTypes.object,
  getEmployeeSelected: PropTypes.object,
  pagination: PropTypes.array,
  statusAbsent: PropTypes.array,
  dataAbsent: PropTypes.array,
  getDataEmployee: PropTypes.array,
  typeUser: PropTypes.string,
}

export default AbsentPage

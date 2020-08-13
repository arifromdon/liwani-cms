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
  DatePickerComponent,
  ModalItemAntd,
  Input
} from 'components/elements'
import { Link } from 'react-router-dom'
import { isEmpty, startCase, toLower } from 'lodash'
import { Spinner, Container, Row, Col, Form, Badge } from 'react-bootstrap'
import { Icon, Empty } from 'antd'
import moment from 'moment'

const columns = ['No', 'Total Kasbon', 'Potongan Per Bulan', 'Sisa Potongan', 'Jangka Potongan', 'Tipe', 'Status']
const columnsEmployee = ['No', 'Nama Karyawan', 'Nomor Telepon', 'Status', 'Action']

const DeductionPage = ({
  onChange,
  modalCreate,
  modalAdd,
  modalEdit,
  modalDelete,
  handleModal,
  handleModalClose,
  handleCreateDeduction,
  handleEditStock,
  handleDeleteStock,
  form,
  onSubmit,
  handleDate,
  isFetching,
  dataDeduction,
  handlePageChange,
  pagination,
  getDataEmployee,
  getEmployeeSelected,
  handleSelect,
  getTypeUser,
}) => {
  const modalBodyDelete = (
    <Container>
      <Row>
        <Col md={12}>
          <p className="my-5 text-center">Apakah anda yakin ingin menghapus pakan</p>
        </Col>
        <Col md={6}>
          <button
            className="btn btn-apply"
            onClick={(e) => handleDeleteStock(e)}
          >Ya
          </button>
        </Col>
        <Col md={6}>
          <button
            className="btn btn-apply"
            onClick={() => handleModalClose({ field: 'delete' })}
          >Tidak
          </button>
        </Col>
      </Row>
    </Container>
  )

  const modalBodyCreate = (
    <BasicTable columns={columnsEmployee}>
    {
      !isEmpty(getDataEmployee)?
      getDataEmployee.map((item, index)  => (
        <tr key={Math.random()}>
          <td>{index + 1}</td>
          <td>{item.employee_name}</td>
          <td>{item.phone_number}</td>
          <td>{item.status}</td>
          <td className="d-flex justify-content-center">
            <button
              type="button"
              className="btn icon-button"
              onClick={() => handleModal({ field: 'add', data: item })}
            >
              <Icon type="edit" />
            </button>
          </td>
        </tr>
      )) : (
        <tr>
          <td colSpan="9" className="text-center py-5"><Empty /></td>
        </tr>
      )
    }
    </BasicTable>
  )

  const modalBodyDeduction = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.total_cash_receipt || ''}
              name="total_cash_receipt"
              type="text"
              placeholder="Total Kasbon"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              name="length_deduction"
              value={form.length_deduction || ''}
              type="text"
              placeholder="Jangka Potongan"
            />
          </Col>
        </Row>
      </Container>

      <Button onClick={(e) => handleCreateDeduction(e)}>Submit</Button>
    </Form>
  )

  const modalBodyEdit = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.in_stock || ''}
              name="in_stock"
              type="text"
              placeholder="Stok Masuk"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              name="out_stock"
              value={form.out_stock || ''}
              type="text"
              placeholder="Stok Keluar"
            />
          </Col>
          <Col md={12} className="mb-4">
            <label htmlFor='employee_selected'>Pilih Karyawan</label>
            <Select
              name='employee_selected'
              value={getEmployeeSelected}
              options={getDataEmployee}
              onChange={e => handleSelect({ value: e, field: 'employee_selected' })}
            />
          </Col>
        </Row>
      </Container>

      <Button onClick={(e) => handleEditStock(e)}>Submit</Button>
    </Form>
  )

  return(
    <Dashboard topik="kasbon" typeUser={getTypeUser}>
      <HeaderPage
        active="List Kasbon"
      >
        List Kasbon
      </HeaderPage>

      <Card>
        <Container fluid className="mb-4">
          <Row className="align-items-center">
            <Col md={{ span: 2, offset: 10 }}>
              <button
                type="button"
                className="btn btn-apply d-flex justify-content-center align-items-center"
                onClick={() => handleModal({ field: 'create' })}
              >
                <Icon type="plus" />
                <small className="ml-2">Tambah Kasbon</small>
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
            !isEmpty(dataDeduction)?
            dataDeduction.map((item, index)  => (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td>{item.total_cash_receipt}</td>
                <td>{item.cash_receipt_term}</td>
                <td>{item.rest_receipt_term}</td>
                <td>{item.monthly_deduction}</td>
                <td>{item.deduce_type}</td>
                <td className="text-center">
                  <Badge
                    pill
                    variant={item.status ? "danger" : "success"}
                    className="px-3"
                  >
                    {String(startCase(toLower(item.status)))}
                  </Badge>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-5"><Empty /></td>
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
            totalItemsCount={isEmpty(pagination) ? 0 : (pagination.total_page * 10)}
            activePage={isEmpty(pagination) ? 0 : pagination.current_page}
            linkClassFirst="symbol-arrow"
            linkClassPrev="symbol-arrow"
            linkClassNext="symbol-arrow"
            linkClassLast="symbol-arrow"
          />
        </div>

        <ModalItemAntd
          show={modalCreate}
          modalBody={modalBodyCreate}
          modalHeader='Tambah Kasbon'
          onCancel={() => handleModalClose({ field: 'create' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          width={1000}
        />

        <ModalItemAntd
          show={modalAdd}
          modalBody={modalBodyDeduction}
          modalHeader='Tambah Kasbon'
          onCancel={() => handleModalClose({ field: 'add' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        />

        <ModalItemAntd
          show={modalEdit}
          modalBody={modalBodyEdit}
          modalHeader='Edit Stok Pakan'
          onCancel={() => handleModalClose({ field: 'edit' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        />

        <ModalItemAntd
          show={modalDelete}
          modalBody={modalBodyDelete}
          modalHeader='Delete Stok Pakan'
          onCancel={() => handleModalClose({ field: 'delete' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        />
      </Card>
    </Dashboard>
  )
}

DeductionPage.propTypes = {
  onChange: PropTypes.func,
  handleDate: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleSelect: PropTypes.func,
  isFetching: PropTypes.bool,
  modalCreate: PropTypes.bool,
  modalAdd: PropTypes.bool,
  modalEdit: PropTypes.bool,
  modalDelete: PropTypes.bool,
  isFetching: PropTypes.bool,
  handleModal: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleCreateDeduction: PropTypes.func,
  handleEditStock: PropTypes.func,
  handleDeleteStock: PropTypes.func,
  form: PropTypes.any,
  dataDeduction: PropTypes.array,
  pagination: PropTypes.object,
  getDataEmployee: PropTypes.array,
  getEmployeeSelected: PropTypes.object,
  getTypeUser: PropTypes.string,
}

export default DeductionPage
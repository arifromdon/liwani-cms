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
import { isEmpty } from 'lodash'
import { Spinner, Container, Row, Col, Form } from 'react-bootstrap'
import { Icon, Empty } from 'antd'
import moment from 'moment'

const columns = ['No', 'Nama Pakan', 'Stok Saat Ini', 'Stok Masuk', 'Stok Keluar', 'Sisa Stok', 'Total Stok', 'Pengambil Stok', 'Action']

const StockPage = ({
  onChange,
  modalCreate,
  modalEdit,
  modalDelete,
  handleModal,
  handleModalClose,
  handleCreateStock,
  handleEditStock,
  handleDeleteStock,
  form,
  onSubmit,
  handleDate,
  isFetching,
  dataStock,
  handlePageChange,
  pagination,
  getDataEmployee,
  getEmployeeSelected,
  handleSelect,
  typeUser,
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
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.stock_name || ''}
              name="stock_name"
              type="text"
              placeholder="Nama Stok Pakan"
            />
          </Col>
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
              value={form.price_stock || ''}
              name="price_stock"
              type="text"
              placeholder="Harga Stok Satuan"
            />
          </Col>
        </Row>
      </Container>

      <Button onClick={(e) => handleCreateStock(e)}>Submit</Button>
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
    <Dashboard topik="stock" typeUser={typeUser}>
      <HeaderPage
        active="Stok Pakan"
      >
        Stok
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
                <small className="ml-2">Tambah Pakan</small>
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
            !isEmpty(dataStock)?
            dataStock.map((item, index)  => (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td><Link to={`stock/${item.id}`}>{item.stock_name}</Link></td>
                <td>{item.current_stock} Karung</td>
                <td>{item.in_stock} Karung</td>
                <td>{item.out_stock} Karung</td>
                <td>{!isEmpty(item.remaining_stock) ? item.remaining_stock : 0} Karung</td>
                <td>{item.total_stock} Karung</td>
                <td>{!isEmpty(item.actor) ? item.actor : '-'}</td>
                <td className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn icon-button"
                    onClick={() => handleModal({ field: 'edit', data: item })}
                  >
                    <Icon type="edit" />
                  </button>
                  <button
                    type="button"
                    className="btn icon-button"
                    onClick={() => handleModal({ field: 'delete', id: item.id })}
                  >
                    <Icon type="delete" />
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
          modalHeader='Tambah Stok Pakan'
          onCancel={() => handleModalClose({ field: 'create' })}
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

StockPage.propTypes = {
  onChange: PropTypes.func,
  handleDate: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleSelect: PropTypes.func,
  isFetching: PropTypes.bool,
  modalCreate: PropTypes.bool,
  modalEdit: PropTypes.bool,
  modalDelete: PropTypes.bool,
  isFetching: PropTypes.bool,
  handleModal: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleCreateStock: PropTypes.func,
  handleEditStock: PropTypes.func,
  handleDeleteStock: PropTypes.func,
  form: PropTypes.any,
  dataStock: PropTypes.array,
  pagination: PropTypes.object,
  getDataEmployee: PropTypes.array,
  getEmployeeSelected: PropTypes.object,
  typeUser: PropTypes.string,
}

export default StockPage
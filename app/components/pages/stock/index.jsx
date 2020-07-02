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
  SelectComponent,
  DatePickerComponent,
  ModalItem,
  Input
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Spinner, Container, Row, Col, Form } from 'react-bootstrap'
import { Icon } from 'antd'
import moment from 'moment'

const columns = ['No', 'Nama Pakan', 'Stok Saat Ini', 'Masuk', 'Keluar', 'Tanggal Masuk', 'Tanggal Keluar', 'Sisa Stok', 'Total Stok', 'Action']

const StockPage = ({
  onChange,
  loading,
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
              value={form.stock_in || ''}
              name="stock_in"
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
          <Col md={12}>
            <DatePickerComponent
              label="Pilih Tanggal Masuk"
              placeholder='Masukan Tanggal Masuk'
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>

      <Button onClick={(e) => handleCreateStock(e)}>Submit</Button>
    </Form>
  )

  const modalBodyEdit = (
    <Form className="form-signin p-1 form-material" onSubmit={onSubmit}>
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.stock_in || ''}
              name="stock_in"
              type="text"
              placeholder="Stok Masuk"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              name="stock_out"
              value={form.stock_out || ''}
              type="text"
              placeholder="Stok Keluar"
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
            <DatePickerComponent
              label="Pilih Tanggal Keluar"
              placeholder='Masukan Tanggal Keluar'
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>

      <Button onClick={(e) => handleEditStock(e)}>Submit</Button>
    </Form>
  )

  return(
    <Dashboard topik="stock">
      <HeaderPage
        active="Stok Pakan"
      >
        Stok
      </HeaderPage>

      <Card>
        <Container fluid>
          <Row className="align-items-center">
            <Col md={3}>
              <DatePickerComponent
                label="Pilih Periode"
                placeholder='Masukan Tanggal Periode'
                onChange={onChange}
              />
            </Col>
            <Col md={{ span: 2, offset: 7 }}>
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

        <BasicTable columns={columns}>
          <tr key={Math.random()}>
            <td>1</td>
            <td>Pur 511</td>
            <td>10 Karung</td>
            <td>2 Karung</td>
            <td>9 Karung</td>
            <td>22-06-2020</td>
            <td>22-06-2020</td>
            <td>3 Karung</td>
            <td>21 Karung</td>
            <td className="d-flex justify-content-center">
              <button
                type="button"
                className="btn icon-button"
                onClick={() => handleModal({ field: 'edit', id: '2' })}
              >
                <Icon type="edit" />
              </button>
              <button
                type="button"
                className="btn icon-button"
                onClick={() => handleModal({ field: 'delete', id: '3' })}
              >
                <Icon type="delete" />
              </button>
            </td>
          </tr>
        </BasicTable>

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

        <ModalItem
          show={modalCreate}
          modalBody={modalBodyCreate}
          modalHeader='Tambah Stok Pakan'
          modalClose={() => handleModalClose({ field: 'create' })}
        />

        <ModalItem
          show={modalEdit}
          modalBody={modalBodyEdit}
          modalHeader='Edit Stok Pakan'
          modalClose={() => handleModalClose({ field: 'edit' })}
        />

        <ModalItem
          show={modalDelete}
          modalBody={modalBodyDelete}
          modalHeader='Delete Stok Pakan'
          modalClose={() => handleModalClose({ field: 'delete' })}
        />

        {/*
          loading ?
          <div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          :
          <BasicTable columns={columns}>
          {
            !isEmpty(subscription)?
            subscription.map((item, index)  => (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>{moment(item.order_date).format('DD-MM-YYYY')}</td>
                <td>
                  <span className={`badge badge-${item.active === 'true' ? 'secondary' : 'primary'}`}>
                    {item.active === 'true' ? 'Aktif' : 'Non Aktif'}
                  </span>
                </td>
                <td className="d-flex justify-content-center">
                  <button
                    type="button"
                    disabled={item.active === 'true' ? true : false}
                    className="btn btn-apply w-50"
                    onClick={() => handleApproval(item.email)}
                  >
                    Aktifkan
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center py-5">No Data'</td>
              </tr>
            )
          }
        </BasicTable>
        */}
      </Card>
    </Dashboard>
  )
}

StockPage.propTypes = {
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  modalCreate: PropTypes.bool,
  modalEdit: PropTypes.bool,
  modalDelete: PropTypes.bool,
  handleModal: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleCreateStock: PropTypes.func,
  handleEditStock: PropTypes.func,
  handleDeleteStock: PropTypes.func,
  form: PropTypes.any,
}

export default StockPage
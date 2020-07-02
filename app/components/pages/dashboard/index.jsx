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
  ModalItem,
  Input,
  BarChart
} from 'components/elements'
import { Icon } from 'antd'
import { Spinner, Container, Row, Col, Form } from 'react-bootstrap'
import { isEmpty } from 'lodash'

const columns = ['No', 'Nama Karyawan', 'Jabatan', 'Telepon', 'Email', 'Status', 'Action']

const DashboardPage = ({
  handleSelect,
  handleModal,
  handleModalClose,
  handleDeleteEmployee,
  handleCreateEmployee,
  handleEditEmployee,
  modalCreate,
  modalEdit,
  modalDelete,
  onChange,
  onSubmit,
  form
}) => {

  const modalBodyDelete = (
    <Container>
      <Row>
        <Col md={12}>
          <p className="my-5 text-center">Apakah anda yakin ingin menghapus karyawan</p>
        </Col>
        <Col md={6}>
          <button
            className="btn btn-apply"
            onClick={(e) => handleDeleteEmployee(e)}
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
              value={form.employee_name || ''}
              name="employee_name"
              type="text"
              placeholder="Nama Karyawan"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.phonenumber || ''}
              name="phonenumber"
              type="text"
              placeholder="No. Telepon"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.email || ''}
              name="email"
              type="email"
              placeholder="Email Karyawan"
            />
          </Col>
          <Col md={12}>
            <SelectComponent
              label='Pilih Jabatan'
              name='position'
              onChange={e => handleSelect({ value: e, field: 'subDistrict' })}
            />
          </Col>
          <Col md={12}>
            <SelectComponent
              label='Pilih Status'
              name='status'
              onChange={e => handleSelect({ value: e, field: 'subDistrict' })}
            />
          </Col>
        </Row>
      </Container>

      <Button
        onClick={(e) => handleCreateEmployee(e)}
        type="submit"
      >Submit
      </Button>
    </Form>
  )

  const modalBodyEdit = (
    <Form className="form-signin p-1 form-material">
      <Input
        onChange={onChange}
        value={form.employee_name || ''}
        name="employee_name"
        type="text"
        placeholder="Nama Karyawan"
      />
      <Input
        onChange={onChange}
        value={form.phonenumber || ''}
        name="phonenumber"
        type="text"
        placeholder="No. Telepon"
      />
      <Input
        onChange={onChange}
        value={form.email || ''}
        name="email"
        type="email"
        placeholder="Email Karyawan"
      />
      <SelectComponent
        label='Pilih Jabatan'
        name='position'
        onChange={e => handleSelect({ value: e, field: 'subDistrict' })}
      />
      <SelectComponent
        label='Pilih Status'
        name='status'
        onChange={e => handleSelect({ value: e, field: 'subDistrict' })}
      />

      <Button
        type="submit"
        onClick={(e) => handleEditEmployee(e)}
      >Submit
      </Button>
    </Form>
  )

  return(
    <Dashboard topik="dashboard">
      <HeaderPage active="Dashboard"/>

      <BarChart/>

      <HeaderPage active="List Karyawan"/>

      <Card>
        <Container fluid>
          <Row className="justify-content-between align-items-center">
            <Col md={3}>
              <SelectComponent
                label='Pilih Tipe Jabatan'
                name='Position Tipe'
              />
            </Col>
            <Col md={3}>
              <SelectComponent
                label='Pilih Tipe Status'
                name='Status Tipe'
              />
            </Col>
            <Col md={{ span: 2, offset: 4 }}>
              <button
                type="button"
                className="btn btn-apply d-flex justify-content-center align-items-center"
                onClick={() => handleModal({field: 'create'})}
              >
                <Icon type="plus" />
                <small className="ml-2">Tambah Karyawan</small>
              </button>
            </Col>
          </Row>
        </Container>

        <BasicTable columns={columns}>
          <tr key={Math.random()}>
            <td>1</td>
            <td>Juju Julaeha</td>
            <td>Admin</td>
            <td>08192893928</td>
            <td>juju@julaeha.com</td>
            <td>Staff</td>
            <td>
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
                onClick={() => handleModal({ field: 'delete', id: '2' })}
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
          modalHeader='Tambah Karyawan'
          modalClose={() => handleModalClose({ field: 'create' })}
        />

        <ModalItem
          show={modalEdit}
          modalBody={modalBodyEdit}
          modalHeader='Edit Karyawan'
          modalClose={() => handleModalClose({ field: 'edit' })}
        />

        <ModalItem
          show={modalDelete}
          modalBody={modalBodyDelete}
          modalHeader='Delete Karyawan'
          modalClose={() => handleModalClose({ field: 'delete' })}
        />

        {/*
          loadingExport || loadingPrice || loadingImport ? 
          <div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          :
          <BasicTable columns={columns}>
          {
            !isEmpty(listData) ?
            listData.map((item, index) => {
              return (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{item.price1}</td>
                  <td>{item.price2}</td>
                  <td>{item.price3}</td>
                  <td>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleModalEdit(item.id)}
                    >
                      <Icon type="edit" />
                    </button>
                  </td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="4" className="text-center py-5">No Data</td>
              </tr>
            )
          }
        </BasicTable>
        */}
      </Card>

    </Dashboard>
  )
}

DashboardPage.propTypes = {
  handleSelect: PropTypes.func,
  handleDeleteEmployee: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  handleModal: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleCreateEmployee: PropTypes.func,
  handleEditEmployee: PropTypes.func,
  form: PropTypes.func,
  modalCreate: PropTypes.bool,
  modalEdit: PropTypes.bool,
  modalDelete: PropTypes.bool,
}

export default DashboardPage

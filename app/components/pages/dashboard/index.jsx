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
  SelectComponent,
  ModalItemAntd,
  Input,
  BarChart,
  DatePickerComponent
} from 'components/elements'
import { Icon, Empty } from 'antd'
import { Spinner, Container, Row, Col, Form } from 'react-bootstrap'
import { isEmpty } from 'lodash'

const columns = ['No', 'Nama Karyawan', 'Jabatan', 'Telepon', 'Email', 'Status', 'Action']

const DashboardPage = ({
  handleSelect,
  handleSelectFilter,
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
  form,
  positionSelected,
  statusSelected,
  filterStatusSelected,
  filterPositionSelected,
  getPosition,
  getStatus,
  getId,
  dataEmployee,
  isFetching,
  isFetchingCreate,
  isFetchingUpdate,
  pagination,
  onChangeDate,
  dataEmployeeCreate,
  handlePageChange,
  isFetchingHistory,
  dataHistoryRecap,
  currentUser,
  typeUser,
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
              value={form.phone_number || ''}
              name="phone_number"
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
            <Input
              onChange={onChange}
              value={form.salary_per_day || ''}
              name="salary_per_day"
              type="text"
              placeholder="Upah Harian"
            />
          </Col>
          <Col md={12}>
            <DatePickerComponent
              label="Pilih Periode"
              placeholder='Masukan Tanggal Periode'
              onChange={onChangeDate}
            />
          </Col>
          <Col md={12} className="mb-3">
            <label htmlFor='position'>Pilih Jabatan</label>
            <Select
              name='position'
              value={positionSelected}
              options={getPosition}
              onChange={e => handleSelect({ value: e, field: 'position' })}
            />
          </Col>
          <Col md={12} className="mb-3">
            <label htmlFor='status'>Pilih Status</label>
            <Select
              name='status'
              value={statusSelected}
              options={getStatus}
              onChange={e => handleSelect({ value: e, field: 'status' })}
            />
          </Col>
          <Col md={6} className="mx-auto">
            <Button
              onClick={(e) => handleCreateEmployee(e)}
              type="submit"
            >{isFetchingCreate ? 'Loading ...' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )

  const modalBodyEdit = (
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
              value={form.phone_number || ''}
              name="phone_number"
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
            <DatePickerComponent
              label="Pilih Periode"
              placeholder='Masukan Tanggal Periode'
              onChange={onChangeDate}
            />
          </Col>
          <Col md={12} className="mb-3">
            <label htmlFor='position'>Pilih Jabatan</label>
            <Select
              name='position'
              value={positionSelected || ''}
              options={getPosition}
              onChange={e => handleSelect({ value: e, field: 'position' })}
            />
          </Col>
          <Col md={12} className="mb-3">
            <label htmlFor='status'>Pilih Status</label>
            <Select
              name='status'
              value={statusSelected || ''}
              options={getStatus}
              onChange={e => handleSelect({ value: e, field: 'status' })}
            />
          </Col>
          <Col md={6} className="mx-auto">
            <Button
              type="submit"
              onClick={(e) => handleEditEmployee(e)}
            >{isFetchingUpdate ? 'Loading ...' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )

  return(
    <Dashboard topik="dashboard" typeUser={typeUser}>
      {
        typeUser === "super_admin" &&
        <React.Fragment>
          <HeaderPage active="Dashboard"/>
          <BarChart dataHistory={dataHistoryRecap} fetching={isFetchingHistory} />
        </React.Fragment>
      }

      <HeaderPage active="List Karyawan"/>

      <Card>
        <Container fluid>
          <Row className="justify-content-between align-items-center">
            <Col md={3}>
              <SelectComponent
                label='Pilih Tipe Jabatan'
                name='Position Tipe'
                value={filterPositionSelected}
                options={getPosition}
                onChange={e => handleSelectFilter({ value: e, field: 'filter-position' })}
              />
            </Col>
            <Col md={3}>
              <SelectComponent
                label='Pilih Tipe Status'
                name='Status Tipe'
                value={filterStatusSelected}
                options={getStatus}
                onChange={e => handleSelectFilter({ value: e, field: 'filter-status' })}
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

        {
          isFetching ? 
          <div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          :
          <BasicTable columns={columns}>
          {
            !isEmpty(dataEmployee) ?
            dataEmployee.map((item, index) => {
              return (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{item.employee_name}</td>
                  <td>{item.position}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  <td>
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
              )
            }) : (
              <tr>
                <td colSpan="7" className="text-center py-5"><Empty /></td>
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
          modalHeader='Tambah Karyawan'
          onCancel={() => handleModalClose({ field: 'create' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        />

        <ModalItemAntd
          show={modalEdit}
          modalBody={modalBodyEdit}
          modalHeader='Edit Karyawan'
          onCancel={() => handleModalClose({ field: 'edit' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        />

        <ModalItemAntd
          show={modalDelete}
          modalBody={modalBodyDelete}
          modalHeader='Delete Karyawan'
          onCancel={() => handleModalClose({ field: 'delete' })}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        />
      </Card>

    </Dashboard>
  )
}

DashboardPage.propTypes = {
  handleSelect: PropTypes.func,
  handleSelectFilter: PropTypes.func,
  handleDeleteEmployee: PropTypes.func,
  handlePageChange: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  handleModal: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleCreateEmployee: PropTypes.func,
  handleEditEmployee: PropTypes.func,
  onChangeDate: PropTypes.func,
  form: PropTypes.object,
  modalCreate: PropTypes.bool,
  modalEdit: PropTypes.bool,
  modalDelete: PropTypes.bool,
  isFetching: PropTypes.bool,
  isFetchingCreate: PropTypes.bool,
  isFetchingUpdate: PropTypes.bool,
  positionSelected: PropTypes.object,
  statusSelected: PropTypes.object,
  filterStatusSelected: PropTypes.object,
  filterPositionSelected: PropTypes.object,
  getId: PropTypes.object,
  pagination: PropTypes.object,
  getPosition: PropTypes.array,
  getStatus: PropTypes.array,
  dataEmployee: PropTypes.array,
  isFetchingHistory: PropTypes.bool,
  dataHistoryRecap: PropTypes.array,
  // typeUser: PropTypes.string,
}

export default DashboardPage

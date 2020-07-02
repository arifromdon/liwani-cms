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
  DatePickerComponent,
  Input,
  ModalItem
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Spinner, Form, Container, Row, Col } from 'react-bootstrap'
import { Icon } from 'antd'
import moment from 'moment'

const columns = ['No', 'Nama Karyawan', 'Tanggal' , 'Jabatan', 'Upah per Hari', 'Potongan per Bulan', 'Total Potongan', 'Sisa Potongan', 'Total Absent', 'Total Upah', 'Action']

const SalaryPage = ({
  onChange,
  loading,
  handleModal,
  handleModalClose,
  modalEditSallary,
  modalEditCashReceipt,
  handleEditSalary,
  handleEditCashReceipt,
  handleExport,
  form,
}) => {

  const modalBodyEditSallary = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.sallary_per_day || ''}
              name="sallary_per_day"
              type="text"
              placeholder="Upah Perhari"
            />
          </Col>
        </Row>
      </Container>

      <Button
        type="submit"
        onClick={(e) => handleEditSalary(e)}
      >Submit
      </Button>
    </Form>
  )

  const modalBodyEditCashReceipt = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.cash_receipt || ''}
              name="cash_receipt"
              type="text"
              placeholder="Besar Kasbon"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.cash_receipt_term || ''}
              name="cash_receipt_term"
              type="text"
              placeholder="Jangka Kasbon"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.monthly_deductions || ''}
              name="monthly_deductions"
              type="text"
              placeholder="Potongan Kasbon per Bulan"
            />
          </Col>
          <Col md={12}>
            <DatePickerComponent
              label="Pilih Tanggal Kasbon"
              placeholder='Masukan Tanggal Kasbon'
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>

      <Button
        type="submit"
        onClick={(e) => handleEditCashReceipt(e)}
      >Submit
      </Button>
    </Form>
  )


  return (
    <Dashboard topik="salary">
      <HeaderPage active="Gaji Karyawan" />

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
                onClick={(e) => handleExport(e)}
              >
                <Icon type="export" />
                <small className="ml-2">Export Sallary</small>
              </button>
            </Col>
          </Row>
        </Container>

        <BasicTable columns={columns}>
          <tr key={Math.random()}>
            <td>1</td>
            <td>Jajang Gombres</td>
            <td>20-06-2020</td>
            <td>Staff</td>
            <td>100.000</td>
            <td>100.000</td>
            <td>500.000</td>
            <td>200.000</td>
            <td>24</td>
            <td>2.400.000</td>
            <td className="d-flex justify-content-start align-items-center">
              <button
                type="button"
                className="btn icon-button"
                onClick={() => handleModal({ field: 'edit', id: '2' })}
              >
                <Icon type="edit" />
                <small className="ml-2">Upah</small>
              </button>
              <button
                type="button"
                className="btn icon-button"
                onClick={() => handleModal({ field: 'cash_receipt', id: '2' })}
              >
                <Icon type="edit" />
                <small className="ml-2">Kasbon</small>
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
          show={modalEditSallary}
          modalBody={modalBodyEditSallary}
          modalHeader='Edit Upah'
          modalClose={() => handleModalClose({ field: 'edit' })}
        />

        <ModalItem
          show={modalEditCashReceipt}
          modalBody={modalBodyEditCashReceipt}
          modalHeader='Tambah Kasbon'
          modalClose={() => handleModalClose({ field: 'cash_receipt' })}
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
                <td>{item.email}</td>
                <td>{item.email}</td>
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
                <td colSpan="8" className="text-center py-5">No Data'</td>
              </tr>
            )
          }
        </BasicTable>
        */}
      </Card>
    </Dashboard>
  )
}

SalaryPage.propTypes = {
  onChange: PropTypes.func,
  handleEditSalary: PropTypes.func,
  handleEditCashReceipt: PropTypes.func,
  handleExport: PropTypes.func,
  loading: PropTypes.bool,
  modalEditSallary: PropTypes.bool,
  modalEditCashReceipt: PropTypes.bool,
}

export default SalaryPage

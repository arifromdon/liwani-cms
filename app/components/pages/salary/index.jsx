import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
import { Icon, Empty } from 'antd'
import moment from 'moment'

const columns = ['No', 'Nama Karyawan', 'Jabatan', 'Upah per Hari', 'Potongan per Bulan', 'Total Potongan', 'Sisa Potongan', 'Action']

const SalaryPage = ({
  onChange,
  handleModal,
  handleModalClose,
  modalEditSallary,
  modalEditCashReceipt,
  handleEditSalary,
  handleEditCashReceipt,
  handlePageChange,
  handleExport,
  dataHistoryRecap,
  form,
  isFetching,
  dataSalary,
  pagination,
  getTypeUser,
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
          <Col md={6} className="mx-auto">
            <Button
              type="submit"
              onClick={(e) => handleEditSalary(e)}
            >Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )

  const modalBodyEditCashReceipt = (
    <Form className="form-signin p-1 form-material">
      <Container>
        <Row>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.total_deduction || ''}
              name="total_deduction"
              type="text"
              placeholder="Besar Kasbon"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.term_cash_receipt || ''}
              name="term_cash_receipt"
              type="text"
              placeholder="Jangka Kasbon"
            />
          </Col>
          <Col md={12}>
            <Input
              onChange={onChange}
              value={form.monthly_deduction || ''}
              name="monthly_deduction"
              type="text"
              placeholder="Potongan Kasbon per Bulan"
            />
          </Col>
          <Col md={6} className="mx-auto">
            <Button
              type="submit"
              onClick={(e) => handleEditCashReceipt(e)}
            >Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )


  return (
    <Dashboard topik="salary" typeUser={getTypeUser}>
      <HeaderPage active="Gaji Karyawan" />

      <Card>

        {
          isFetching ?
          <div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          :
          <BasicTable columns={columns}>
          {
            !isEmpty(dataSalary)?
            dataSalary.map((item, index)  => (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td><Link to={`/salary/${item.id}`}>{item.employee_name}</Link></td>
                <td>{item.position.position_name}</td>
                <td>{item.salary_per_day}</td>
                <td>{item.monthly_deduction}</td>
                <td>{item.total_deduction}</td>
                <td>{item.remaining_deduction}</td>
                <td className="d-flex justify-content-start align-items-center">
                {
                  getTypeUser === 'super_admin' &&
                  (
                    <button
                      type="button"
                      className="btn icon-button"
                      onClick={() => handleModal({ field: 'edit', id: '2' })}
                    >
                      <Icon type="edit" />
                      <small className="ml-2">Upah</small>
                    </button>
                  )
                }
                </td>
              </tr>
            )) : (
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
            totalItemsCount={isEmpty(pagination) ? 0 : (pagination.total_page * 10)}
            activePage={isEmpty(pagination) ? 0 : pagination.current_page}
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
      </Card>
    </Dashboard>
  )
}

SalaryPage.propTypes = {
  onChange: PropTypes.func,
  handleEditSalary: PropTypes.func,
  handleEditCashReceipt: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleExport: PropTypes.func,
  modalEditSallary: PropTypes.bool,
  modalEditCashReceipt: PropTypes.bool,
  isFetching: PropTypes.bool,
  dataSalary: PropTypes.array,
  pagination: PropTypes.array,
  getTypeUser: PropTypes.string,
}

export default SalaryPage

import React from 'react'
import PropTypes from 'prop-types'
import ReactExport from 'react-export-excel';
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
  ModalItemAntd,
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { Icon } from 'antd'
import moment from 'moment'
import logoStock from 'assets/images/data-warehouse.png'
import logoSalary from 'assets/images/salary.png'

const columns = ['No', 'Nama Pengeluaran', 'Periode' , 'Total Pengeluaran', 'Action']

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const RecapPage = ({
  handleExport,
  handleModalClose,
  isFetching,
  dataRecap,
  pagination,
  modalExportBulk,
  modalExportStock,
  modalExportSalary,
  handleModalExport,
  typeUser,
}) => {

  const modalExportForm = (
    <Container>
      <Row>
        <Col md={12}>
          <DatePickerComponent
            onChange={handleExport}
            label="Pilih Bulan Periode"
          />
        </Col>
        <Col md={4} className="ml-auto">
          <ExcelFile
            element={
              <button
                type="button"
                className="btn btn-apply d-flex justify-content-center align-items-center"
              >
                <small className="ml-2">Export Semua</small>
              </button>
            }
          >
            <ExcelSheet data name="Employees">
              <ExcelColumn label="Name" value="name"/>
              <ExcelColumn label="Wallet Money" value="amount"/>
              <ExcelColumn label="Gender" value="sex"/>
              <ExcelColumn label="Marital Status"
                             value={(col) => col.is_married ? "Married" : "Single"}/>
            </ExcelSheet>
            <ExcelSheet data name="Leaves">
              <ExcelColumn label="Name" value="name"/>
              <ExcelColumn label="Total Leaves" value="total"/>
              <ExcelColumn label="Remaining Leaves" value="remaining"/>
            </ExcelSheet>
          </ExcelFile>
        </Col>
      </Row>
    </Container>
  )

  return (
    <Dashboard topik="recap" typeUser={typeUser}>
      <HeaderPage active="Rekap">Rekap</HeaderPage>

      <Container className="mt-5">
        <Row className="justify-content-between">
          <Col md={5} xs={12}>
            <Link to="/recap/show_sallary">
              <Card>
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <p className="mr-2 mb-0 text-dark">Detail Gaji</p>
                  <Icon type="arrow-right" className="text-dark"/>
                </div>
                <img src={logoSalary} className="w-50 d-block mx-auto mb-5"/>
                <div>
                  <p className="text-dark">Menampilkan kumpulan hasil dari gaji PT Liwani Kencana Indonesia</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col md={5} xs={12}>
            <Link to="/recap/show_stock">
              <Card>
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <p className="mr-2 mb-0 text-dark">Detail Stok</p>
                  <Icon type="arrow-right" className="text-dark"/>
                </div>
                <img src={logoStock} className="w-50 d-block mx-auto mb-5"/>
                <div>
                  <p className="text-dark">Menampilkan kumpulan hasil dari stok PT Liwani Kencana Indonesia</p>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>

      <ModalItemAntd
        show={modalExportBulk}
        modalBody={modalExportForm}
        onCancel={() => handleModalClose({ field: 'bulk' })}
        modalHeader='Export Semua'
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      />

      <ModalItemAntd
        show={modalExportStock}
        modalBody={modalExportForm}
        modalHeader='Export Stok'
        onCancel={() => handleModalClose({ field: 'stock' })}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      />

      <ModalItemAntd
        show={modalExportSalary}
        modalBody={modalExportForm}
        modalHeader='Export Gaji'
        onCancel={() => handleModalClose({ field: 'salary' })}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      />

    </Dashboard>
  )
}

RecapPage.propTypes = {
  handleExport: PropTypes.func,
  handleModalClose: PropTypes.func,
  isFetching: PropTypes.bool,
  dataRecap: PropTypes.array,
  pagination: PropTypes.any,
  modalExportBulk: PropTypes.bool,
  modalExportStock: PropTypes.bool,
  modalExportSalary: PropTypes.bool,
  typeUser: PropTypes.string,
}

export default RecapPage

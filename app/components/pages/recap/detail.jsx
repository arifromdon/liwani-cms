import React from 'react'
import PropTypes from 'prop-types'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactExport from 'react-export-excel';
import { Link } from 'react-router-dom'
import { isEmpty, sum } from 'lodash'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import {
  Dashboard,
  BasicTable,
  Card,
  HeaderPage,
  Button
} from 'components/elements'
import { Icon, DatePicker, Empty } from 'antd'
import { toRp } from 'helper'

const { MonthPicker } = DatePicker;

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const columns = ['No', 'Nama Karyawan', 'Jabatan', 'Total Jam Kerja (Jam)', 'Status', 'Total Upah']
const columnsStock = ['No', 'Nama Stok', 'Stok Saat Ini' , 'Total Stok', 'Harga Stok Satuan', 'Total Harga Stok']

const DetailRecap = ({
  isFetchingDetail,
  dataDetailRecap,
  getTarget,
  handleDateRecap,
  isFetchingHistory,
  dataHistoryRecap,
  typeUser,
  getHours,
}) => {

  return(
    <Dashboard topik="recap" typeUser={typeUser}>
      <HeaderPage
        active={getTarget !== '/recap/show_stock' ? 'Detail Rekap Gaji' : 'Detail Rekap Stok'}
      >
        {getTarget !== '/recap/show_stock' ? 'Detail Rekap Gaji' : 'Detail Rekap Stok'}
      </HeaderPage>
      <Card>
        <Container fluid className="mb-4">
          <Row className="align-items-center">
            <Col md={3}>
              <label>Pilih Periode</label>
              <MonthPicker
                placeholder='Masukan Bulan Periode'
                onChange={(e) => handleDateRecap(e)}
                picker="month"
                format="MMMM YYYY"
              />
            </Col>
            <Col md={{ span: 2, offset: 7 }}>
              <ReactHTMLTableToExcel
                table={getTarget !== '/recap/show_stock' ? 'table-recap-salary' : 'table-recap-stock'}
                filename="recapExcelFile"
                sheet="sheet 1"
                buttonText="Export Recap"
                className="btn btn-apply"
              />
            </Col>
          </Row>
        </Container>
        <BasicTable
          columns={getTarget !== '/recap/show_stock' ? columns : columnsStock}
          idTable={getTarget !== '/recap/show_stock' ? 'table-recap-salary' : 'table-recap-stock'}
        >
        {
          getTarget !== '/recap/show_stock' ?
            !isEmpty(dataHistoryRecap) && !isFetchingHistory ? 
            dataHistoryRecap.map((item, index) => {
              return (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{item.employee_name}</td>
                  <td>{item.position}</td>
                  <td>{getHours}</td>
                  <td>{item.status}</td>
                  <td>Rp. {!isEmpty(item.total_salary) ? toRp(item.total_salary) : '0'}</td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan="9" className="text-center py-5">
                {isFetchingHistory ? 'Loading ...' : <Empty />}
              </td>
            </tr>
            :
            !isEmpty(dataDetailRecap) && !isFetchingDetail ? 
            dataDetailRecap.map((item, index) => {
              return(
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{item.stock_name}</td>
                  <td>{item.current_stock}</td>
                  <td>{item.total_stock}</td>
                  <td>{!isEmpty(item.price_stock) ? toRp(item.price_stock) : '0'}</td>
                  <td>{!isEmpty(item.total_price_stock) ? toRp(item.total_price_stock) : '0'}</td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan="9" className="text-center py-5">
                {isFetchingDetail ? 'Loading ...' : <Empty />}
              </td>
            </tr>
          }
          <tr>
            <td colSpan={getTarget !== '/recap/show_stock' ? '5' : '5'} className="font-weight-bold text-right">Total: </td>
            <td colSpan='2' className="font-weight-bold">{
              getTarget !== '/recap/show_stock' ?
              toRp(sum(Object.values(!isEmpty(dataHistoryRecap) && dataHistoryRecap.map(item => !isEmpty(item) && item.total_salary))), 'Rp. ')
              :
              toRp(sum(Object.values(dataDetailRecap.map(item => !isEmpty(item.total_price_stock) ? item.total_price_stock : '0'))), 'Rp. ')
            }
            </td>
          </tr>
        </BasicTable>
      </Card>
      <Link to="/recap" className="d-flex align-items-center">
        <Icon type="arrow-left"/>
        <h5 className="mb-0 ml-2">Kembali</h5>
      </Link>
    </Dashboard>
  )
}

DetailRecap.propTypes = {
  handleDateRecap: PropTypes.func,
  isFetchingDetail: PropTypes.bool,
  dataDetailRecap: PropTypes.array,
  getTarget: PropTypes.string,
  typeUser: PropTypes.string,
  getHours: PropTypes.string,
}

export default DetailRecap

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
import { isEmpty, sum, startCase, toLower } from 'lodash'
import { Spinner, Container, Row, Col, Table } from 'react-bootstrap'
import { Icon, DatePicker, Empty } from 'antd'
import moment from 'moment'
import logo from 'assets/images/logo_liwani.png'
import logoFooter from 'assets/images/footer-img.png'
import { toRp } from 'helper'

const { MonthPicker } = DatePicker;

const columns = ['No', 'Nama Karyawan', 'Jabatan', 'Tunjangan Makan', 'Tunjangan Jabatan', 'Tunjangan Transportasi', 'Status', 'Total Upah']

const RecapPage = ({
  isFetchingDetail,
  dataDetailRecap,
  isFetchingHistory,
  dataHistoryRecap,
  getTypeUser,
  handleDateRecap,
  getTarget,
  getHours,
  getCounting,
  handleCounting,
  getMonth,
}) => {

  const PrintSalaryPdf = ({id, label}) => {
    const pxToMm = (px) => {
      return Math.floor(px/document.getElementById('myMm').offsetHeight);
    };

    const mmToPx = (mm) => {
      return document.getElementById('myMm').offsetHeight*mm;
    };

    const range = (start, end) => {
      return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
    };

    return(
      <div className="tc mb4 mt2">
        <div id="myMm" style={{height: "1mm"}} />

        <button
          type="button"
          disabled={!isEmpty(dataHistoryRecap) ? false : true}
          className="btn btn-apply d-flex justify-content-center mx-auto mb-5 align-items-center w-50 pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
          onClick={(e) => {
            handleCounting()

            var doc = new jsPDF("p", "mm", "a5");
            html2canvas(document.querySelector("#pdf-recap")).then(function(canvas){

              var imgData = canvas.toDataURL('image/png');
              var pageHeight = 295;  
              var imgWidth = (canvas.width * 25) / 375 ; 
              var imgHeight = canvas.height * imgWidth / canvas.width;
              var heightLeft = imgHeight;
              var position = 10;

              doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;

              while (heightLeft >= 0) {
                  position = heightLeft - imgHeight;
                  doc.addPage();
                  doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                  heightLeft -= pageHeight; 
              }
              doc.output('dataurlnewwindow');
              doc.save('laporan-gaji-.pdf');
            });
          }}
        >
          <Icon type="export" />
          <small className="ml-2">{label}</small>
        </button>

        <div id="pdf-recap">
          <Container>
            <Row className="mb-5">
              <Col md={2} className="text-center">
                <img src={logo} className="w-50"/>
              </Col>
              <Col md={10} className="my-auto">
                <h4 className="mb-0">PT. Liwani Kencana Indonesia</h4>
                <p className="mb-0">Ruko Fresno B-9 Kota Delta Mas Jl. Ganesha Boulevard</p>
                <p className="mb-0">Ds.Hegarmukti Kec. Cikarang Pusat, Bekasi 17530 - Indonesia</p>
                <p className="mb-0">Telp. 021-2961 0797</p>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md={12} className="text-center">
                <Table responsive className="table-export">
                  <tbody>
                    <tr>
                      <td className="text-left font-weight-bold">Nomor</td>
                      <td className="pr-2 font-weight-bold">:</td>
                      <td className="text-left font-weight-bold">{`${getCounting}/DG/LIW/${getMonth}`}</td>
                    </tr>
                    <tr>
                      <td className="text-left font-weight-bold">Lamp</td>
                      <td className="pr-2 font-weight-bold">:</td>
                      <td className="text-left font-weight-bold">-</td>
                    </tr>
                    <tr>
                      <td className="text-left font-weight-bold">Hal</td>
                      <td className="pr-2 font-weight-bold">:</td>
                      <td className="text-left font-weight-bold">Lampiran Daftar Gaji Karyawan PT. Liwani Kencana Indonesia</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col>
                <BasicTable
                  columns={columns}
                  idTable='table-recap-salary'
                >
                {
                    !isEmpty(dataHistoryRecap) && !isFetchingHistory ? 
                    dataHistoryRecap.map((item, index) => {
                      return (
                        <tr key={Math.random()}>
                          <td>{index + 1}</td>
                          <td>{item.employee_name}</td>
                          <td>{!isEmpty(item.position) && startCase(toLower(item.position.position_name))}</td>
                          <td>Rp. {!isEmpty(item.position) && toRp(item.position.meal_allowances)}</td>
                          <td>Rp. {!isEmpty(item.position) && toRp(item.position.positional_allowance)}</td>
                          <td>Rp. {!isEmpty(item.position) && toRp(item.position.transportation_allowance)}</td>
                          <td>{item.status}</td>
                          <td>Rp. {toRp(item.total_salary)}</td>
                        </tr>
                      )
                    })
                    :
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        {isFetchingHistory ? 'Loading ...' : <Empty />}
                      </td>
                    </tr>
                  }
                  <tr>
                    <td colSpan='7' className="font-weight-bold text-right">Total: </td>
                    <td colSpan='2' className="font-weight-bold">
                    {
                      toRp(sum(Object.values(!isEmpty(dataHistoryRecap) && dataHistoryRecap.map(item => !isEmpty(item) && item.total_salary))), 'Rp. ')
                    }
                    </td>
                  </tr>
                </BasicTable>
              </Col>
            </Row>

            <Row>
              <Col className="text-right">
                <img src={logoFooter} className="icon-footer"/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  };

  return (
    <Dashboard topik="recap" typeUser={getTypeUser}>
      <HeaderPage active="Rekap">Rekap</HeaderPage>

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
            </Col>
          </Row>
        </Container>
        <BasicTable
          columns={columns}
          idTable='table-recap-salary'
        >
        {
            !isEmpty(dataHistoryRecap) && !isFetchingHistory ? 
            dataHistoryRecap.map((item, index) => {
              return (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{item.employee_name}</td>
                  <td>{!isEmpty(item.position) && startCase(toLower(item.position.position_name))}</td>
                  <td>Rp. {!isEmpty(item.position) && toRp(item.position.meal_allowances)}</td>
                  <td>Rp. {!isEmpty(item.position) && toRp(item.position.positional_allowance)}</td>
                  <td>Rp. {!isEmpty(item.position) && toRp(item.position.transportation_allowance)}</td>
                  <td>{item.status}</td>
                  <td>Rp. {toRp(item.total_salary)}</td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan="9" className="text-center py-5">
                {isFetchingHistory ? 'Loading ...' : <Empty />}
              </td>
            </tr>
          }
          <tr>
            <td colSpan='7' className="font-weight-bold text-right">Total: </td>
            <td colSpan='2' className="font-weight-bold">
            {
              toRp(sum(Object.values(!isEmpty(dataHistoryRecap) && dataHistoryRecap.map(item => !isEmpty(item) && item.total_salary))), 'Rp. ')
            }
            </td>
          </tr>
        </BasicTable>
      </Card>

      <Container>
        <Row>
          <Col md={12} className="mx-auto">
            <PrintSalaryPdf id={"singlePage"} label={"Cetak Laporan Gaji"} />
          </Col>
        </Row>
      </Container>
    </Dashboard>
  )
}

RecapPage.propTypes = {
  isFetchingDetail: PropTypes.bool,
  dataDetailRecap: PropTypes.array,
  isFetchingHistory: PropTypes.bool,
  dataHistoryRecap: PropTypes.array,
  handleExport: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleDateRecap: PropTypes.func,
  pagination: PropTypes.any,
  modalExportBulk: PropTypes.bool,
  modalExportStock: PropTypes.bool,
  modalExportSalary: PropTypes.bool,
  getTypeUser: PropTypes.string,
  getMonth: PropTypes.string,
  getCounting: PropTypes.int,
  handleCounting: PropTypes.func,
}

export default RecapPage

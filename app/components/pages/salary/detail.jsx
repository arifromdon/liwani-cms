import React from 'react'
import { first, isEmpty, sum } from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner, Container, Row, Col, Table } from 'react-bootstrap'
import { Icon, Empty } from 'antd'
import ExportPage from "./export";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from 'assets/images/logo_liwani.png'
import moment from 'moment'
import { toRp } from 'helper'
import {
  Dashboard,
  HeaderPage,
  LoadingSkeleton,
  Button,
  Card,
} from 'components/elements'

const DetailSalary = ({
  isFetchingDetail,
  dataDetailSalary,
  dataRecapEmployee,
  typeUser,
  getHours,
}) => {
  const recapEmployee = !isEmpty(dataRecapEmployee) && first(dataRecapEmployee)

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
          disabled={!isEmpty(recapEmployee) ? false : true}
          className="btn btn-apply d-flex justify-content-center mx-auto mb-5 align-items-center w-50 pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
          onClick={(e) => {

            var doc = new jsPDF("p", "mm", "a5");
            html2canvas(document.querySelector("#gombres")).then(function(canvas){

              var imgData = canvas.toDataURL('image/png');
              var pageHeight = 295;  
              var imgWidth = (canvas.width * 20) / 210 ; 
              var imgHeight = canvas.height * imgWidth / canvas.width;
              var heightLeft = imgHeight;
              var position = 30;

              doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;

              while (heightLeft >= 0) {
                  position = heightLeft - imgHeight;
                  doc.addPage();
                  doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                  heightLeft -= pageHeight; 
              }
              doc.output('dataurlnewwindow');
              doc.save('slip_gaji'+dataDetailSalary.employee_name+'.pdf');
            });
          }}
        >
          <Icon type="export" />
          <small className="ml-2">{label}</small>
        </button>

        <div id="gombres">
          {
            !isEmpty(recapEmployee) ? (
              <Container className="my-4 px-5" id={id}>
                <Row>
                  <Col md={10} className="my-auto">
                    <h4 className="mb-0">PT. Liwani Kencana Indonesia</h4>
                    <p className="mb-0">Sukarasa, Tanjungsari, Bogor, West Java 16840 Indonesia</p>
                  </Col>
                  <Col md={2} className="text-center">
                    <img src={logo} className="w-50"/>
                  </Col>
                </Row>

                <hr/>

                <Row>
                  <Col md={12}>
                    <h3>Slip gaji untuk bulan {moment(dataDetailSalary.date).format("MMMM YYYY")}</h3>
                  </Col>
                  <Col md={12}>
                    <h6 className="text-primary">GAJI KARYAWAN YANG DIBAYARKAN</h6>
                  </Col>
                  <Col md={6}>
                    <Table responsive className="table-export">
                      <tbody>
                        <tr>
                          <td>Nama Karyawan</td>
                          <td className="pr-2">:</td>
                          <td>{dataDetailSalary.employee_name}</td>
                        </tr>
                        <tr>
                          <td>Jabatan</td>
                          <td className="pr-2">:</td>
                          <td>{dataDetailSalary.position}</td>
                        </tr>
                        <tr>
                          <td>Periode Pembayaran</td>
                          <td className="pr-2">:</td>
                          <td>{moment(dataDetailSalary.date).format("MMMM YYYY")}</td>
                        </tr>
                        <tr>
                          <td>Tanggal Pembayaran</td>
                          <td className="pr-2">:</td>
                          <td>{moment(dataDetailSalary.date).format("DD MMMM YYYY")}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6} className="my-auto">
                    <small className="d-block text-center">Gaji Bersih Karyawan</small>
                    <h2 className="text-primary text-center">Rp. {!isEmpty(recapEmployee) ? toRp(recapEmployee.total_salary) : 0}</h2>
                  </Col>
                </Row>

                <hr/>

                <Row>
                  <Col md={12}>
                    <Table responsive className="table-export">
                      <thead>
                        <tr>
                          <th className="text-primary">PENDAPATAN</th>
                          <th className="text-primary text-right">JUMLAH</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Upah Per Hari</td>
                          <td className="text-right">Rp {toRp(dataDetailSalary.salary_per_day)}</td>
                        </tr>
                        <tr>
                          <td>Lembur</td>
                          <td className="text-right">Rp 0</td>
                        </tr>
                        <tr>
                          <td>Tunjangan</td>
                          <td className="text-right">Rp 0</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold pt-3">Pendapatan Kotor</td>
                          <td className="text-right font-weight-bold pt-3">Rp {!isEmpty(recapEmployee) ? toRp(recapEmployee.total_salary) : 0}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                <hr />

                <Row>
                  <Col md={12}>
                    <Table responsive className="table-export">
                      <thead>
                        <tr>
                          <th className="text-primary">POTONGAN</th>
                          <th className="text-primary text-right">JUMLAH</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Potongan per Bulan</td>
                          <td className="text-right">Rp {toRp(dataDetailSalary.monthly_deduction)}</td>
                        </tr>
                        <tr>
                          <td>Total Potongan</td>
                          <td className="text-right">Rp {toRp(dataDetailSalary.total_deduction)}</td>
                        </tr>
                        <tr>
                          <td>Jumlah</td>
                          <td className="text-right">Rp {!isEmpty(recapEmployee) ? toRp(recapEmployee.total_salary) : 0}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold pt-3">Pendapatan Bersih</td>
                          <td className="text-right font-weight-bold pt-3">Rp {!isEmpty(recapEmployee) ? toRp(recapEmployee.total_salary) : 0}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                <hr/>

                <Row>
                  <Col md={12}>
                    <h3 className="text-center">Total Gaji Dibayarkan Rp {!isEmpty(recapEmployee) ? toRp(recapEmployee.total_salary) : 0}</h3>
                  </Col>
                </Row>

                <hr/>

                <Row>
                  <Col md={12}>
                    <small className="text-center d-block">PT LIWANI KENCANA INDONESIA</small>
                  </Col>
                </Row>
              </Container>
            ) : (
              <Container>
                <Row>
                  <Col className="text-center"><Empty /></Col>
                </Row>
              </Container>
            )
          }
        </div>
      </div>
    )
  };

  return(
    <Dashboard topik="salary" typeUser={typeUser}>
      <div className="d-flex align-items-center">
        <Link to="/salary" className="d-flex align-items-center mr-3 mb-3">
          <Icon type="left"/>
          <h5 className="mb-0 ml-2">Kembali</h5>
        </Link>
        <HeaderPage
          active="Detail gaji"
        >
          Detail Gaji
        </HeaderPage>
      </div>
      <Card>

        {
          isFetchingDetail ? 
          (<div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          )
          :
          (
            <React.Fragment>
              <Container fluid className="my-4">
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Nama Karyawan</label>
                    <p className="font-weight-bold">{dataDetailSalary.employee_name}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Tanggal</label>
                    <p className="font-weight-bold">{moment(dataDetailSalary.date).format("DD MMMM YYYY")}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Jabatan</label>
                    <p className="font-weight-bold">{dataDetailSalary.position}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Upah per Hari</label>
                    <p className="font-weight-bold">{toRp(dataDetailSalary.salary_per_day)}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Potongan per Bulan</label>
                    <p className="font-weight-bold">{dataDetailSalary.monthly_deduction}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Total Potongan</label>
                    <p className="font-weight-bold">{dataDetailSalary.total_deduction}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Sisa Potongan</label>
                    <p className="font-weight-bold">{dataDetailSalary.remaining_deduction}</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Total Jam Masuk</label>
                    <p className="font-weight-bold">{!isEmpty(getHours) ? getHours : 0} Jam</p>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <label>Total Upah</label>
                    <p className="font-weight-bold">{!isEmpty(recapEmployee.total_salary) ? toRp(recapEmployee.total_salary) : 0}</p>
                  </Col>
                </Row>
              </Container>
            </React.Fragment>
          )
        }
      </Card>
      <Card>
        <Container>
          <Row>
            <Col md={8} className="mx-auto">
              <PrintSalaryPdf id={"singlePage"} label={"Cetak Slip Gaji"} />
            </Col>
          </Row>
        </Container>
      </Card>
    </Dashboard>
  )
}

DetailSalary.propTypes = {
  isFetchingDetail: PropTypes.bool,
  dataDetailSalary: PropTypes.object,
  typeUser: PropTypes.string,
}

export default DetailSalary

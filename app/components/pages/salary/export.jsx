import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Container, Row, Col, Table } from 'react-bootstrap'
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import jsPDF from 'jspdf';
import logo from 'assets/images/logo_liwani.png'

const ExportSalary = ({
  id,
  employeeName,
  position,
  date,
  totalSalary,
  salaryPerDay,
  monthlyDeduction,
  totalDeduction,
  remainingDeduction,
}) => {
  const pxToMm = (px) => {
    return Math.floor(px/document.getElementById('myMm').offsetHeight);
  };

  const mmToPx = (mm) => {
    return document.getElementById('myMm').offsetHeight*mm;
  };

  const range = (start, end) => {
    return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
  };

  console.log('id: ', id)

  return(
    <React.Fragment>
      <Container className="my-4">
        <Row>
          <Col>
            <Link to={`/salary/${id}`} className="d-flex align-items-center">
              <Icon type="left"/>
              <h5 className="mb-0 ml-2">Kembali</h5>
            </Link>
          </Col>
          <Col>
            <button
              type="button"
              className="btn btn-apply d-flex justify-content-center align-items-center w-50 pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
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
                  doc.save(Date.now() +'.pdf');
                });
              }}
            >
              <Icon type="export" />
              <small className="ml-2">Cetak Slip Gaji</small>
            </button>
          </Col>
        </Row>
      </Container>
      <div id="gombres">
        <div className="tc mb4 mt2">
          <div id="myMm" style={{height: "1mm"}} />
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
                <h3>Slip gaji untuk bulan</h3>
              </Col>
              <Col md={12}>
                <h6 className="text-primary">GAJI KARYAWAN YANG DIBAYARKAN</h6>
              </Col>
              <Col md={6}>
                <Table responsive className="table-export">
                  <tbody>
                    <tr>
                      <td>Nama Karyawan</td>
                      <td>:</td>
                      <td>{employeeName}</td>
                    </tr>
                    <tr>
                      <td>Jabatan</td>
                      <td>:</td>
                      <td>{position}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Gabung</td>
                      <td>:</td>
                      <td>28-07-2020</td>
                    </tr>
                    <tr>
                      <td>Periode Pembayaran</td>
                      <td>:</td>
                      <td>{date}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Pembayaran</td>
                      <td>:</td>
                      <td>28-07-2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6} className="my-auto">
                <small className="d-block text-center">Gaji Bersih Karyawan</small>
                <h2 className="text-primary text-center">Rp {totalSalary}</h2>
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
                      <td>Basic</td>
                      <td className="text-right">Rp {totalSalary}</td>
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
                      <td className="text-right font-weight-bold pt-3">Rp 2.200.000</td>
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
                      <td className="text-right">Rp {monthlyDeduction}</td>
                    </tr>
                    <tr>
                      <td>Total Potongan</td>
                      <td className="text-right">Rp {totalDeduction}</td>
                    </tr>
                    <tr>
                      <td>Jumlah</td>
                      <td className="text-right">Rp {totalSalary}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold pt-3">Pendapatan Bersih</td>
                      <td className="text-right font-weight-bold pt-3">Rp {totalSalary}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <hr/>

            <Row>
              <Col md={12}>
                <h3 className="text-center">Total Gaji Dibayarkan Rp {totalSalary}</h3>
              </Col>
            </Row>

            <hr/>

            <Row>
              <Col md={12}>
                <small className="text-center d-block">PT LIWANI KENCANA INDONESIA</small>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

ExportSalary.propTypes = {
  id: PropTypes.any,
}

export default ExportSalary
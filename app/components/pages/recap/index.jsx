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
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { Icon } from 'antd'
import moment from 'moment'

const columns = ['No', 'Nama Pengeluaran', 'Tanggal' , 'Total Pengeluaran', 'Action']

const RecapPage = ({
  handleExport,
  isFetching,
  dataRecap,
  pagination,
}) => (
  <Dashboard topik="recap">
    <HeaderPage
      active="Rekap"
    >
      Rekap
    </HeaderPage>
    <Card>

      <Container fluid>
        <Row className="align-items-center">
          <Col md={3}>
            <DatePickerComponent
              label="Pilih Periode"
              placeholder='Masukan Tanggal Periode'
            />
          </Col>
          <Col md={{ span: 2, offset: 7 }}>
            <button
              type="button"
              className="btn btn-apply d-flex justify-content-center align-items-center"
              onClick={() => handleExport()}
            >
              <Icon type="export" />
              <small className="ml-2">Export Semua</small>
            </button>
          </Col>
        </Row>
      </Container>

      <BasicTable columns={columns}>
        <tr key={Math.random()}>
          <td>1</td>
          <td>Gaji</td>
          <td>28-06-2020</td>
          <td>Rp. 20.000.000</td>
          <td className="d-flex justify-content-center w-50">
            <button
              type="button"
              className="btn btn-apply d-flex justify-content-center align-items-center"
              onClick={() => handleExport({ field: 'salary', id: '2' })}
            >
              <Icon type="export" />
              <small className="ml-2">Export Gaji</small>
            </button>
          </td>
        </tr>
        <tr key={Math.random()}>
          <td>2</td>
          <td>Stok</td>
          <td>28-06-2020</td>
          <td>Rp. 30.000.000</td>
          <td className="d-flex justify-content-center w-50">
            <button
              type="button"
              className="btn btn-apply d-flex justify-content-center align-items-center"
              onClick={() => handleExport({ field: 'stock', id: '2' })}
            >
              <Icon type="export" />
              <small className="ml-2">Export Stok</small>
            </button>
          </td>
        </tr>
        <tr key={Math.random()}>
          <td colSpan="3"><span className="font-weight-bold">TOTAL</span></td>
          <td colSpan="2"><span className="font-weight-bold">Rp. 50.000.000</span></td>
        </tr>
      </BasicTable>

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

RecapPage.propTypes = {
  handleExport: PropTypes.func,
  isFetching: PropTypes.bool,
  dataRecap: PropTypes.array,
  pagination: PropTypes.any,
}

export default RecapPage

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { Icon } from 'antd'
import {
  Dashboard,
  HeaderPage,
  LoadingSkeleton,
  Button,
  Card,
} from 'components/elements'


const DetailStock = ({
  isFetchingDetail,
  dataDetailStock,
  typeUser,
}) => {
  return(
    <Dashboard topik="stock" typeUser={typeUser}>
      <HeaderPage
        active="Detail Stok Pakan"
      >
        Detail Stok
      </HeaderPage>
      <Card>
      {
        isFetchingDetail ? 
        <React.Fragment>
          <div>
            <Spinner animation="border" className="d-block mx-auto" />
            <p className="text-center mt-2">Loading ...</p>
          </div>
          <LoadingSkeleton/>
        </React.Fragment>
        :
        <Container fluid className="my-4">
          <Row>
            <Col md={6} className="mb-3">
              <label>Nama Stok</label>
              <p className="font-weight-bold">{dataDetailStock.stock_name}</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Stok saat ini</label>
              <p className="font-weight-bold">{dataDetailStock.current_stock} Karung</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Stok Masuk</label>
              <p className="font-weight-bold">{dataDetailStock.in_stock} Karung</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Stok Keluar</label>
              <p className="font-weight-bold">{dataDetailStock.out_stock} Karung</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Tanggal Masuk</label>
              <p className="font-weight-bold">{moment(dataDetailStock.date_in).format("DD-MM-YYYY")}</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Tanggal Keluar</label>
              <p className="font-weight-bold">{moment(dataDetailStock.date_out).format("DD-MM-YYYY")}</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Sisa Stok</label>
              <p className="font-weight-bold">{dataDetailStock.remaining_stock} Karung</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Total Stok</label>
              <p className="font-weight-bold">{dataDetailStock.total_stock} Karung</p>
            </Col>
            <Col md={6} className="mb-3">
              <label>Aktor Pengambil Stok</label>
              <p className="font-weight-bold">{!isEmpty(dataDetailStock.actor) ? dataDetailStock.actor : '-'}</p>
            </Col>
          </Row>
        </Container>
      }
      </Card>
      <Link to="/stock" className="d-flex align-items-center">
        <Icon type="left"/>
        <h5 className="mb-0 ml-2">Kembali</h5>
      </Link>
    </Dashboard>
  );
}

DetailStock.propTypes = {
  isFetchingDetail: PropTypes.bool,
  dataDetailStock: PropTypes.object,
  typeUser: PropTypes.string,
}

export default DetailStock
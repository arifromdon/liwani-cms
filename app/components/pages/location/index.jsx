import React from 'react'
import PropTypes from 'prop-types'
import {
  Dashboard, BasicTable, Card, HeaderPage, LoadingSkeleton, Button, Pagination, SelectComponent, ModalItem, Input
} from 'components/elements'
import { Icon } from 'antd'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { isEmpty } from 'lodash'

const columns = ['No', 'Harga 1', 'Harga 2' ,'Harga 3', 'Harga 4', 'Harga 5', 'Umur 1', 'Umur 2', 'Umur 3', 'Umur 4', 'Umur 5', 'Harga Telur', 'Aksi']

const LocationPage = ({
  provinceOptions,
  provinceSelected,
  districtSelected,
  districtOptions,
  subDistrictSelected,
  subDistrictOptions,
  handleSelect,
  handleGetPrice,
  handleImport,
  handleExport,
  handleModalEdit,
  handleEdit,
  loadingExport,
  loadingPrice,
  loadingImport,
  modalShow,
  listData,
  onChange,
  form
}) => {

  const modalBody = (
    <Container>
      <h4 className="mb-0">Harga Ayam</h4>
      <Row className="mb-3">
        <Col md={6} xs={12} className="mt-3">
          <label>Harga 1</label>
          <Input
            onChange={onChange}
            value={form.price1 || ''}
            name="price1"
            type="text"
            placeholder="Masukan Harga ke 1"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Harga 2</label>
          <Input
            onChange={onChange}
            value={form.price2 || ''}
            name="price2"
            type="text"
            placeholder="Masukan Harga ke 2"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Harga 3</label>
          <Input
            onChange={onChange}
            value={form.price3 || ''}
            name="price3"
            type="text"
            placeholder="Masukan Harga ke 3"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Harga 4</label>
          <Input
            onChange={onChange}
            value={form.price4 || ''}
            name="price4"
            type="text"
            placeholder="Masukan Harga ke 4"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Harga 5</label>
          <Input
            onChange={onChange}
            value={form.price5 || ''}
            name="price5"
            type="text"
            placeholder="Masukan Harga ke 5"
          />
        </Col>
      </Row>
      <h4 className="mb-0">Umur Ayam</h4>
      <Row className="mb-3">
        <Col md={6} xs={12} className="mt-3">
          <label>Umur 1</label>
          <Input
            onChange={onChange}
            value={form.age1 || ''}
            name="age1"
            type="text"
            placeholder="Masukan Umur ke 5"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Umur 2</label>
          <Input
            onChange={onChange}
            value={form.age2 || ''}
            name="age2"
            type="text"
            placeholder="Masukan Umur ke 5"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Umur 3</label>
          <Input
            onChange={onChange}
            value={form.age3 || ''}
            name="age3"
            type="text"
            placeholder="Masukan Umur ke 5"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Umur 4</label>
          <Input
            onChange={onChange}
            value={form.age4 || ''}
            name="age4"
            type="text"
            placeholder="Masukan Umur ke 5"
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <label>Umur 5</label>
          <Input
            onChange={onChange}
            value={form.age5 || ''}
            name="age5"
            type="text"
            placeholder="Masukan Umur ke 5"
          />
        </Col>
      </Row>
      <h4 className="mb-0">Harga Telur</h4>
      <Row className="mb-3">
        <Col md={6} xs={12} className="mt-3">
          <label>Harga Telur</label>
          <Input
            onChange={onChange}
            value={form.egg_price || ''}
            name="egg_price"
            type="text"
            placeholder="Masukan Harga Telur"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} xs={12} className="mt-3 mx-auto">
          <button
            type="submit"
            className="btn btn-apply"
            onClick={(e) => handleEdit(e)}
          >
            Submit
          </button>
        </Col>
      </Row>
    </Container>
  )

  return(
  <Dashboard topik="location">
    <HeaderPage
      list={['Home', 'Location']}
      active="location"
    >
      Lokasi
    </HeaderPage>
    <Card>
      <h3 className="mb-4">Dapatkan Harga Berdasarkan Lokasi</h3>
      <div className="row">
        <div className="col-md-3 col-12">
          <SelectComponent
            value={provinceSelected}
            options={provinceOptions}
            label='Pilih Province'
            name='Province'
            onChange={e => handleSelect({ value: e, field: 'province'})}
          />
        </div>
        <div className="col-md-3 col-12">
          <SelectComponent
            value={districtSelected}
            options={districtOptions}
            label='Pilih Kabupaten'
            name='Kabupaten'
            onChange={e => handleSelect({ value: e, field: 'district' })}
          />
        </div>
        <div className="col-md-3 col-12">
          <SelectComponent
            value={subDistrictSelected}
            options={subDistrictOptions}
            label='Pilih Kecamatan'
            name='Kecamatan'
            onChange={e => handleSelect({ value: e, field: 'subDistrict' })}
          />
        </div>
        <div className="col-md-3 col-12 align-self-center">
          <button
            type="button"
            className="btn btn-apply"
            onClick={() => handleGetPrice(subDistrictSelected)}
          >
            Cari Harga
          </button>
        </div>
      </div>
    </Card>
    <div className="row justify-content-end m-b-30 ">
      <div className="col-md-2">
        <div className="button-wrapper">
          <span className="label">
            Import
          </span>
          <input
            type="file"
            name="upload"
            id="upload"
            className="upload-box btn btn-block btn-info btn-rounded"
            placeholder="Import"
            onChange={(e) => handleImport(e)}
          />
        </div>
      </div>
      <div className="col-md-2">
        <Button
          onClick={() => handleExport()}
        >
          Export
        </Button>
      </div>
    </div>
    <Card>
      {
        loadingExport || loadingPrice || loadingImport ? 
        <div>
          <Spinner animation="border" className="d-block mx-auto" />
          <p className="text-center mt-2">Loading ...</p>
        </div>
        :
        <BasicTable columns={columns}>
        {
          !isEmpty(listData) ?
          listData.map((item, index) => {
            return (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td>{item.price1}</td>
                <td>{item.price2}</td>
                <td>{item.price3}</td>
                <td>{item.price4}</td>
                <td>{item.price5}</td>
                <td>{item.age1}</td>
                <td>{item.age2}</td>
                <td>{item.age3}</td>
                <td>{item.age4}</td>
                <td>{item.age5}</td>
                <td>{item.egg_price}</td>
                <td>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => handleModalEdit(item.id)}
                  >
                    <Icon type="edit" />
                  </button>
                </td>
              </tr>
            )
          }) : (
            <tr>
              <td colSpan="13" className="text-center py-5">No Data</td>
            </tr>
          )
        }
      </BasicTable>
      }
    </Card>

    <ModalItem
      show={modalShow}
      modalBody={modalBody}
      modalHeader='Edit Harga Ayam & Telur'
    />

  </Dashboard>
)}

LocationPage.propTypes = {
  provinceSelected: PropTypes.object,
  districtSelected: PropTypes.object,
  subDistrictSelected: PropTypes.object,
  districtOptions: PropTypes.array,
  provinceOptions: PropTypes.array,
  subDistrictOptions: PropTypes.array,
  listData: PropTypes.array,
  handleSelect: PropTypes.func,
  handleGetPrice: PropTypes.func,
  handleImport: PropTypes.func,
  handleExport: PropTypes.func,
  handleModalEdit: PropTypes.func,
  onChange: PropTypes.func,
  handleEdit: PropTypes.func,
  loadingExport: PropTypes.bool,
  loadingPrice: PropTypes.bool,
  loadingImport: PropTypes.bool,
  modalShow: PropTypes.bool,
  form: PropTypes.any,
}

export default LocationPage

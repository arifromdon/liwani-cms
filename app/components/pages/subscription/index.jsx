import React from 'react'
import PropTypes from 'prop-types'
import {
  Dashboard, BasicTable, Card, HeaderPage, LoadingSkeleton, Button, Pagination, DatePickerComponent,
} from 'components/elements'
import { isEmpty } from 'lodash'
import { Spinner } from 'react-bootstrap'
import moment from 'moment'

const columns = ['No', 'Email', 'Tanggal Order' , 'Status', 'Action']

const SubscriptionPage = ({
  subscription,
  onChange,
  loading,
  handleApproval
}) => (
  <Dashboard topik="subscription">
    <HeaderPage
      list={['Home', 'Subscription']}
      active="subscription"
    >
      Subscription
    </HeaderPage>
    <Card>
      <div className="w-25">
        <DatePickerComponent
          label="Pilih Periode"
          placeholder='Masukan Tanggal Periode'
          onChange={onChange}
        />
      </div>
      {
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
              <td colSpan="5" className="text-center py-5">No Data'</td>
            </tr>
          )
        }
      </BasicTable>
      }
    </Card>
  </Dashboard>
)

SubscriptionPage.propTypes = {
  subscription: PropTypes.array,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  handleApproval: PropTypes.func,
}

export default SubscriptionPage

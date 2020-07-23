import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Spinner, Container, Row, Col, Form, Alert } from 'react-bootstrap'
import {
  Card, Input, Button,
} from 'components/elements'
import logo from 'assets/images/logo_liwani.png'


const ForgotPassword = ({
  onSubmit,
  onChange,
  form,
  isFetchingCheck,
  isFetchingReset,
  errorMessage,
}) => {
  return(
    <div className="form-container">
      <Container style={{ height: '100%', minHeight: '100vh' }}>
        <Row className="m-auto h-100">
          <Col md={6} className="m-auto">
            <img src={logo} className="d-block mx-auto mb-4" style={{ width: '30%' }}/>
            <Card>
              <h3 className="box-title m-b-20 text-center">Reset Password</h3>
              {
                isFetchingCheck || isFetchingReset ? 
                <div className="wrapper-loading">
                  <div className="card-loading">
                    <Spinner animation="border" className="mr-2" />
                    <p className="mb-0">Loading...</p>
                  </div>
                </div>
                :
                <Form className="form-signin p-1 form-material" onSubmit={onSubmit}>
                  <Row>
                    <Col md={12}>
                      <label className="mb-3">Masukan Password Baru</label>
                      <Input
                        onChange={onChange}
                        value={form.new_email || ''}
                        name="new_email"
                        type="password"
                        placeholder="New Password"
                      />
                    </Col>
                    <Col md={12}>
                      <label className="mb-3">Masukan Konfirmasi Password</label>
                      <Input
                        onChange={onChange}
                        value={form.confirm_email || ''}
                        name="confirm_email"
                        type="password"
                        disabled={isEmpty(form.new_email) ? true : false}
                        placeholder="Confirm Password"
                      />
                    </Col>
                  </Row>

                  {errorMessage && <Alert variant="info">{errorMessage}</Alert>}

                  <Button
                    disabled={isEmpty(form.confirm_email) ? true : false}
                    type="submit"
                  >{isFetchingReset ? "Loading ..." : "Submit"}</Button>
                </Form>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isFetchingCheck: PropTypes.bool,
  isFetchingReset: PropTypes.bool,
  errorMessage: PropTypes.string,
}

export default ForgotPassword
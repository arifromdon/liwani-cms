import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Spinner, Container, Row, Col, Form, Alert } from 'react-bootstrap'
import {
  Card, Input, Button,
} from 'components/elements'
import logo from 'assets/images/logo_liwani.png'


const ForgotPassword = ({
  onSubmit,
  errorMessage,
  onChange,
  form,
  isFetchingForgot,
  errorMessageForgot,
}) => {
  return(
    <div className="form-container">
      <Container style={{ height: '100%', minHeight: '100vh' }}>
        <Row className="m-auto h-100">
          <Col md={6} className="m-auto">
            <img src={logo} className="d-block mx-auto mb-4" style={{ width: '30%' }}/>
            <Card>
              <h3 className="box-title m-b-20 text-center">Forgot Password</h3>
              <Form className="form-signin p-1 form-material" onSubmit={onSubmit}>
                <label className="mb-3">Masukan email anda</label>
                <Input
                  onChange={onChange}
                  value={form.email || ''}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />

                {errorMessageForgot && <Alert variant="info">{errorMessageForgot}</Alert>}

                <Button
                  disabled={isEmpty(form.email) ? true : false}
                  type="submit"
                >{isFetchingForgot ? "Loading ..." : "Submit"}</Button>
              </Form>
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
  errorMessage: PropTypes.string,
  errorMessageForgot: PropTypes.string,
  isFetchingForgot: PropTypes.bool,
}

export default ForgotPassword
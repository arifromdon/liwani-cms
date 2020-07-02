import PropTypes from 'prop-types'
import {
  Card, Input, Button, Checkbox,
} from 'components/elements'
import { Form, Alert, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from 'assets/images/logo_liwani.png'

const Login = (props) => {
  const {
    onChange,
    onSubmit,
    form,
    errorMessage,
    isAuthenticating,
  } = props

  return (
    <div className="form-container">
      <div className="form-box">
        <img src={logo} className="w-50 d-block mx-auto mb-4"/>
        {
          isAuthenticating ? (
            <div className="wrapper-loading">
              <div className="card-loading">
                <Spinner animation="border" className="mr-2" />
                <p className="mb-0">Loading...</p>
              </div>
            </div>
          ) : (
            <Card>
              <h3 className="box-title m-b-20 text-center">Sign In</h3>
              <Form className="form-signin p-1 form-material" onSubmit={onSubmit}>
                <Input
                  onChange={onChange}
                  value={form.email || ''}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
                <Input
                  onChange={onChange}
                  value={form.password || ''}
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <div className="form-group d-flex justify-content-end align-items-center">
                  <Link to='/forgot-password'>
                    <small>Forgot Password</small>
                  </Link>
                </div>

                <Link to="/dashboard">
                  <Button disabled={isAuthenticating} type="submit">Sign in</Button>
                </Link>
              </Form>
            </Card>
          )
        }
      </div>
    </div>
  )
}

Login.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  form: PropTypes.any,
  errorMessage: PropTypes.string,
  isAuthenticating: PropTypes.bool,
}

export default Login

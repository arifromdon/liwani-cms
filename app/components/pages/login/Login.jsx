import PropTypes from 'prop-types'
import {
  Card, Input, Button, Checkbox,
} from 'components/elements'
import { Form, Alert } from 'react-bootstrap'

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
        <Card>
          <h3 className="box-title m-b-20">Sign In</h3>
          <Form className="form-signin p-1 form-material" onSubmit={onSubmit}>
            <Input onChange={onChange} value={form.email || ''} name="email" type="email" placeholder="Email Address" />
            <Input onChange={onChange} value={form.password || ''} name="password" type="password" placeholder="Password" />

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="form-group">
              <Checkbox
                name="forgot-password"
              />
            </div>

            <Button disabled={isAuthenticating} type="submit">Sign in</Button>
          </Form>
        </Card>
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

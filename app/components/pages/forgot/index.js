import PropTypes from 'prop-types'
import {
  Card, Input, Button, Checkbox,
} from 'components/elements'
import { Form, Alert } from 'react-bootstrap'

const ForgotPassword = (props) => {
  const {
    onChange,
    onSubmit,
    form,
    errorMessageForgot,
    loadingForgot,
  } = props

  return (
    <div className="form-container">
      <div className="form-box">
        <Card>
          <h3 className="box-title m-b-20">Forgot Password</h3>
          <Form className="form-signin p-1 form-material" onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              value={form.email || ''}
              name="email"
              type="email"
              placeholder="Masukan Email"
            />
            <Input
              onChange={onChange}
              value={form.password || ''}
              name="password"
              type="password"
              placeholder="Masukan Password Baru"
            />
            <Input
              onChange={onChange}
              value={form.password_confirmation || ''}
              name="password_confirmation"
              type="password"
              placeholder="Ulangi Password Baru"
            />

            {errorMessageForgot && <Alert variant="danger">{errorMessageForgot}</Alert>}

            <Button disabled={loadingForgot} type="submit">Submit</Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

ForgotPassword.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  form: PropTypes.any,
  errorMessageForgot: PropTypes.string,
  loadingForgot: PropTypes.bool,
}

export default ForgotPassword

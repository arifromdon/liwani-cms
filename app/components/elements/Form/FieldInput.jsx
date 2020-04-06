import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
/* eslint-disable */
const FieldInput = ({
  placeholder,
  name,
  type,
  label,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>
  
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="form-control"
      id={name}
    />
    {error && <span className="error">{error}</span>}

  </div>
)

FieldInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.any,
}

export default FieldInput
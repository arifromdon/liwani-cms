/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectComponent = ({
  value,
  options,
  label,
  name,
  error,
  onChange,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>

    <Select
      value={value}
      options={options}
      name={name}
      classNamePrefix="container-select"
      onChange={onChange}
    />
    {error && <span className="error">{error}</span>}
  </div>
)

SelectComponent.propTypes = {
  value: PropTypes.object,
  options: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
}

export default SelectComponent

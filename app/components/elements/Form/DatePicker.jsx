/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'

const dateFormat = 'DD MMMM YYYY'

const DatePickerComponent = ({
  label,
  placeholder,
  onChange,
  value,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>
    <DatePicker
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      format={dateFormat}
    />
  </div>
)

DatePickerComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
}

export default DatePickerComponent

import PropTypes from 'prop-types'

const Input = (props) => {
  const {
    value,
    onChange,
    type,
    name,
    placeholder,
    disabled,
  } = props
  return (
    <div className="form-group">
      <div className="col-xs-12">
        <input
          className="form-control"
          type={type}
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          required
        />
      </div>
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Input

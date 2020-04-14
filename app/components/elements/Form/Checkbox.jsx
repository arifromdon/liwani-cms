/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types'

const Checkbox = (props) => {
  const {
    name,
    check,
    onChange,
  } = props
  return (
    <div className="checkbox checkbox-info pull-left p-t-0">
      <input
        id={name}
        type="checkbox"
        className="filled-in chk-col-light-blue"
        onChange={onChange}
        checked={check}
      />
      <label htmlFor={name} className="mb-0"> Remember me </label>
    </div>
  )
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  check: PropTypes.bool,
  name: PropTypes.string,
}

export default Checkbox

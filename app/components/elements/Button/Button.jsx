/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types'

const Button = (props) => {
  const {
    children,
    onClick,
    disabled,
    danger = false,
    typeButton = 'submit',
  } = props

  return (
    <div className="col-xs-12">
      <button
        className={`btn btn-block btn-info btn-rounded ${danger && 'btn-danger'}`}
        type={typeButton}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  typeButton: PropTypes.any,
}

export default Button

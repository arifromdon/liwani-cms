import PropTypes from 'prop-types'

const CardTitle = (props) => {
  const {
    children,
  } = props
  return (
    <h4 className="card-title">
      {children}
    </h4>
  )
}

CardTitle.propTypes = {
  children: PropTypes.any,
}

export default CardTitle

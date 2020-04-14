import PropTypes from 'prop-types'

const Card = (props) => {
  const {
    children,
  } = props
  return (
    <div className="card mb-4">
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.any,
}

export default Card

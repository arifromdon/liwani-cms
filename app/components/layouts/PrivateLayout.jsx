import PropTypes from 'prop-types'

const PrivateLayout = ({ children }) => (
  <div className="app main">
    <div id="yield" className="app-main-body">
      {children}
    </div>
  </div>
)

PrivateLayout.propTypes = {
  children: PropTypes.node,
}

export default PrivateLayout

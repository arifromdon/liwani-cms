import PropTypes from 'prop-types'

const PublicLayout = ({ children }) => (
  <div className="app main-public">
    <div id="yield" className="app-main-public-body">
      {children}
    </div>
  </div>
)

PublicLayout.propTypes = {
  children: PropTypes.node,
}

export default PublicLayout

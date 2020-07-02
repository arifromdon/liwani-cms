import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HeaderPage = ({ active, link, textLink }) => (
  <div className="container-fluid">
    <div className="row align-items-center">
      <div className={link !== '' ? 'col-10' : 'col-12'}>
        <h2 className="title-page">{active}</h2>
      </div>
      {
        link !== '' &&
        <div className="col-2">
          <Link to={link}>{textLink}</Link>
        </div>
      }
    </div>
  </div>
)

HeaderPage.propTypes = {
  active: PropTypes.any,
  link: PropTypes.string,
  textLink: PropTypes.string,
}

export default HeaderPage

import PropTypes from 'prop-types'

const HeaderPage = ({ children, list, active }) => (
  <div className="row header-page">
    <div className="col-md-5 align-self-center">
      <h3 className="text-themecolor">{children}</h3>
    </div>
    <div className="col-md-7 align-self-center">
      <div className="breadcrumb">
        {list.map(key => (
          <div className={`breadcrumb-item ${active === key && 'active'}`} key={Math.random()}>
            {key}
          </div>
        ))
        }
      </div>
    </div>
  </div>
)

HeaderPage.propTypes = {
  children: PropTypes.any,
  list: PropTypes.any,
  active: PropTypes.any,
}

export default HeaderPage

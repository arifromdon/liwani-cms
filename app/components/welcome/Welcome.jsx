import PropTypes from 'prop-types'
import { Button, Container } from 'react-bootstrap'

const Welcome = ({ currentUser, onLogout }) => (
  <Container>
    <div className="starter-template">
      <h1>Bootstrap starter template</h1>

      <p>
        Use this document as a way to quickly start any new project.
        <br />
        All you get is this text and a mostly barebones HTML document.
      </p>

      <div style={{ marginBottom: '30px' }}>
        { currentUser && (
          <span style={{ fontSize: '10px' }}>
            {`Access Token: ${currentUser.access_token}`}
          </span>
        )}
      </div>

      <Button onClick={() => onLogout()} variant="primary">Logout</Button>
    </div>
  </Container>
)

Welcome.propTypes = {
  currentUser: PropTypes.any,
  onLogout: PropTypes.func,
}

export default Welcome

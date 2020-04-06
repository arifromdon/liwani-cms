import {
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap'

const NotFound = () => (
  <Container>
    <Row>
      <Col md="12">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>

        <div className="error-details">
          Sorry, an error has occured, Requested page not found!
        </div>

        <Button href="/welcome" variant="primary">Take Me Home</Button>
      </Col>
    </Row>
  </Container>
)

export default NotFound

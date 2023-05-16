import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";

const FooterMobile = () => {
  return (
    <footer className="footer sticky-bottom footer-pin">
      <Container>
        <Row>
          <Col xs="6" className="">
            <p className="fw-bold my-3">2023 © Planted</p>
          </Col>
          <Col xs="6" className=""></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterMobile;

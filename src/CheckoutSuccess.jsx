import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

const CheckoutSuccess = () => {
  //Get id of product selected on prev page
  const location = useLocation();
  const { orderId, email } = location.state;

  console.log("orderId: ", orderId);
  console.log("email: ", email);

  return (
    <Container fluid className="content-container">
      <Row className="mb-3">
        <Col xs="12">
          <Card className="rounded-5 my-3">
            <CardBody className="">
              <Container className="px-0">
                <Row className="ps-2 mt-2">
                  <Col xs="12" className="text-center my-2">
                    <img
                      className="img-product-medium"
                      alt="Planted Logo Circular"
                      src="../images/PlantedLogoGreen.png"
                    />
                    <h4 className="text-center mt-3">
                      Thank you for your order!
                      <br />
                      ORDER ID <strong> PLANTED#{orderId} </strong>
                    </h4>
                    <h5 className="text-center">
                      Confirmation has been sent to {email}
                    </h5>
                  </Col>
                  <Col
                    xs="12"
                    className="justify-content-center align-items-center my-3"
                  >
                    <Link to={`/`} className="category-button">
                      <Button
                        block
                        className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                      >
                        <h5 className="m-0">Continue Shopping</h5>
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutSuccess;

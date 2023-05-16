import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

const SignInNeeded = () => {
  //Get id of product selected on prev page
  const location = useLocation();
  console.log("location.state: ", location.state);
  const { message } = location.state;

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
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
                        <div className="loading-pane mt-3 mb-0">
                          <h4 className="text-center">Oops!</h4>
                          <h3 className="ms-2">😒</h3>
                        </div>
                        <h5 className="text-center">
                          {message ?? "An error occured"}
                        </h5>
                      </Col>
                      <Col
                        xs="12"
                        className="justify-content-center align-items-center my-3"
                      >
                        <Link
                          to={`/login`}
                          state={{ redirectFlag: true }}
                          className="category-button"
                        >
                          <Button
                            block
                            className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                          >
                            <h5 className="m-0">Sign In</h5>
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default SignInNeeded;

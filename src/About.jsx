import { Container, Row, Col, Card, CardBody } from "reactstrap";
import CardIconText from "./CardIconText";

const About = () => {
  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row>
            <Col xs="6" className="px-0">
              <CardIconText
                title="FREE SHIPPING"
                descrip="Orders over £20"
                iconName="rocketIcon"
                iconClass="svg-rotate fs-1"
                cardClass="my-2 border-0 bg-transparent"
                colOne="2"
                colTwo="10"
              />
            </Col>
            <Col className="px-0 d-flex col-auto">
              <div className="vr my-3"></div>
            </Col>
            <Col className="px-0 col-auto">
              <CardIconText
                title="FREE RETURNS"
                descrip="Within 30 days"
                iconName="arrowReturnsIcon"
                iconClass="fs-1 me-3"
                cardClass="my-2 border-0 bg-transparent"
                colOne="2"
                colTwo="10"
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6" className="d-flex align-items-stretch">
              <Card className="rounded-5 mb-3">
                <CardBody className="d-flex flex-column">
                  <Container className="px-0">
                    <Row className="ps-2 mt-2">
                      <Col xs="12" className="text-center my-2">
                        <img
                          className="img-product-medium"
                          alt="Planted Logo Circular"
                          src="../images/PlantedLogoGreen.png"
                        />
                        <h4 className="text-center mt-3">
                          A new plant start-up, bringing the best of indoor and
                          outdoor plants to your doorstep.
                        </h4>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="6" className="d-flex align-items-stretch pb-0">
              <Card className="rounded-5 mb-3 back-yellow-green">
                <CardBody className="d-flex flex-column pb-0">
                  <Container className="p-0">
                    <Row className="ps-2 m-0 align-items-end">
                      <Col xs="7" className="text-center">
                        <img
                          style={{ objectFit: "contain" }}
                          className="img-product-large mb-0"
                          alt="Tall plant in pot"
                          src="../images/aboutPage_tall.png"
                        />
                      </Col>
                      <Col xs="5" className="my-2 p-3">
                        <h1>Add More Green To Your Space</h1>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Col xs="12" className="my-2">
            <h6 className="text-underline-green">Contact Us</h6>
          </Col>
          <Row className="gy-2 pe-0 mb-3">
            <Col
              xs="12"
              lg="4"
              className="d-flex align-items-stretch flex-column"
            >
              <Card className="rounded-5">
                <CardBody className="p-0 d-flex align-items-stretch">
                  <Container className="px-0">
                    <Row className="">
                      <Col xs="12" className="">
                        <CardIconText
                          title="Telephone"
                          descrip="0123456789"
                          iconName="telephone"
                          iconClass="fs-1"
                          cardClass="my-2 border-0 bg-transparent"
                          colOne="2"
                          colTwo="10"
                        />
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col
              xs="12"
              lg="4"
              className="d-flex align-items-stretch flex-column"
            >
              <Card className="rounded-5">
                <CardBody className="p-0 d-flex align-items-stretch">
                  <Container className="px-0">
                    <Row className="">
                      <Col xs="12" className="">
                        <CardIconText
                          title="Email"
                          descrip="Planted@gmail.com"
                          iconName="email"
                          iconClass="fs-1"
                          cardClass="my-2 border-0 bg-transparent"
                          colOne="2"
                          colTwo="10"
                        />
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col
              xs="12"
              lg="4"
              className="d-flex align-items-stretch flex-column"
            >
              <Card className="rounded-5">
                <CardBody className="p-0 d-flex align-items-stretch">
                  <Container className="px-0">
                    <Row className="">
                      <Col xs="12" className="">
                        <CardIconText
                          title="Address"
                          descrip="123, Plant Way, Greenland"
                          iconName="location"
                          iconClass="fs-1"
                          cardClass="my-2 border-0 bg-transparent"
                          colOne="2"
                          colTwo="10"
                        />
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="mb-2">
              <h6 className="text-underline-green">Website By</h6>
            </Col>
            <Col xs="12">
              <Card className="rounded-5 mb-3">
                <CardBody className="">
                  <Container className="px-0">
                    <Row className="ps-2 mt-2">
                      <Col xs="12" className="text-center my-2">
                        <img
                          className="img-fluid"
                          alt="Pixelwave Logo"
                          src="../images/PixelwaveLogo.png"
                        />
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

export default About;

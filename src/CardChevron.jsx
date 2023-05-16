import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, CardBody } from "reactstrap";
import { ChevronCompactRight } from "react-bootstrap-icons";

const CardChevron = ({
  textSection,
  leftSection,
  linkUrl,
  colSizeLeft,
  colSizeMid,
  colSizeRight,
  linkData,
  linkSection,
}) => {
  return (
    <Link
      to={linkUrl}
      state={{
        linkData: linkData,
        formSection: linkSection,
      }}
      className="category-button"
    >
      <Card className="rounded-5">
        <CardBody className="d-flex flex-column">
          <Container className="px-0">
            <Row className="m-2 justify-content-center align-items-center align-middle">
              <Col xs={colSizeLeft} className="">
                {leftSection}
              </Col>
              <Col xs={colSizeMid} className="">
                {textSection}
              </Col>
              <Col
                xs={colSizeRight}
                className="justify-content-center align-items-center text-center"
              >
                <ChevronCompactRight className="bi--5xl" size={50} />
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardChevron;

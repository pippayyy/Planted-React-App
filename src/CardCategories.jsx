import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardBody, Container, Row, Col } from "reactstrap";

const CardCategories = ({ name, img, id }) => {
  return (
    <Link
      to={`/products/category`}
      state={{ filterId: { id } }}
      className="category-button"
    >
      <Card className="rounded-5 text-center" id={id}>
        <Container>
          <Row>
            <Col xs="2" className="px-0"></Col>
            <Col xs="8" className="px-0 ps-2 mt-2">
              <img
                className="img-responsive img-category"
                alt={name}
                src={img}
              />
            </Col>
            <Col xs="2" className="px-0"></Col>
          </Row>
        </Container>
        <CardBody className="p-0 py-1 mb-1">
          <CardTitle tag="small">{name}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardCategories;

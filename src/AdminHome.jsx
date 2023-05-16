import { Container, Row, Col } from "reactstrap";
import CardChevron from "./CardChevron";
import { Bag, Grid, Tag } from "react-bootstrap-icons";

const AdminHome = () => {
  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="3" className=""></Col>
        <Col xs="12" md="6" className="">
          <Row>
            <Col xs="12" className="mt-3">
              <h6 className="text-underline-green m-0">Admin Options</h6>
            </Col>
          </Row>
          <Row className="g-2 my-2 mb-3">
            <Col xs="12" md="12" className="">
              <CardChevron
                textSection={<h5 className="mb-0 text-start">Products</h5>}
                leftSection={<Bag size={35} />}
                linkUrl="/admin/products"
                colSizeLeft="2"
                colSizeMid="8"
                colSizeRight="2"
              />
            </Col>
            <Col xs="12" md="12" className="">
              <CardChevron
                textSection={<h5 className="mb-0 text-start">Categories</h5>}
                leftSection={<Grid size={35} />}
                linkUrl="/admin/categories"
                colSizeLeft="2"
                colSizeMid="8"
                colSizeRight="2"
              />
            </Col>
            <Col xs="12" md="12" className="">
              <CardChevron
                textSection={
                  <h5 className="mb-0 text-start">Discount Codes</h5>
                }
                leftSection={<Tag size={35} />}
                linkUrl="/admin/discounts"
                colSizeLeft="2"
                colSizeMid="8"
                colSizeRight="2"
              />
            </Col>
          </Row>
        </Col>
        <Col xs="0" md="3" className=""></Col>
      </Row>
    </Container>
  );
};

export default AdminHome;

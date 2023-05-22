import CardCategories from "./CardCategories";
import { Row, Col } from "reactstrap";

const ResultsCategories = ({ categories }) => {
  return (
    <Row className="g-2 mb-3">
      {!categories.length ? (
        <div className="loading-pane">
          {" "}
          Loading
          <h3 className="loader ms-2">꩜</h3>
        </div>
      ) : (
        categories.map((category) => (
          <Col xs="4" lg="2" key={category.id}>
            <CardCategories
              name={category.name}
              img={category.img}
              id={category.id}
            />
          </Col>
        ))
      )}
    </Row>
  );
};

export default ResultsCategories;

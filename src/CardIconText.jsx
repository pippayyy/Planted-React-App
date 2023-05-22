import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardTitle, CardText, Container, Row, Col } from "reactstrap";
import {
  Rocket,
  ArrowCounterclockwise,
  Tag,
  Sun,
  ArrowsExpand,
  Circle,
  Telephone,
  EnvelopeAt,
  GeoAlt,
  CheckCircle,
  Gear,
  Bag,
} from "react-bootstrap-icons";

const CardIconText = ({
  title,
  descrip,
  iconName,
  iconClass,
  cardClass,
  colOne,
  colTwo,
}) => {
  //Used to lookup iconName prop in libary of icon components
  const componentLookup = {
    rocketIcon: Rocket,
    arrowReturnsIcon: ArrowCounterclockwise,
    tagIcon: Tag,
    sunIcon: Sun,
    arrowsExpandIcon: ArrowsExpand,
    circleIcon: Circle,
    telephone: Telephone,
    email: EnvelopeAt,
    location: GeoAlt,
    checkCircle: CheckCircle,
    gear: Gear,
    bag: Bag,
  };

  const CardIcon = componentLookup[iconName];

  return (
    <Card body className={cardClass}>
      <Container>
        <Row>
          <Col xs={colOne} md="3" className="px-0 text-center">
            <CardIcon className={iconClass} />
          </Col>
          <Col xs={colTwo} md="9" className="px-0 ps-2">
            <CardTitle className="mb-0 fw-bold" tag="h6">
              {title}
            </CardTitle>
            <CardText className="mt-0 fw-light" tag="p">
              {descrip}
            </CardText>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CardIconText;
